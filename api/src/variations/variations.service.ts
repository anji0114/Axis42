import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateVariationDto,
  CreateVariationWithFilesDto,
} from './dto/create-variation.dto';
import { Variation, GeneratedFile } from '@prisma/client';

const testHtml = `  
<html>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
`;

@Injectable()
export class VariationsService {
  constructor(private prisma: PrismaService) {}

  async createVariation(
    userId: string,
    createVariationDto: CreateVariationDto,
  ): Promise<Variation> {
    // 関数が存在し、ユーザーがアクセス権を持っていることを確認
    const func = await this.prisma.function.findUnique({
      where: {
        id: createVariationDto.functionId,
        project: {
          userId,
        },
      },
    });

    if (!func) {
      throw new NotFoundException('Function not found or access denied');
    }

    return this.prisma.$transaction(async (tx) => {
      // バリエーションを作成
      const variation = await tx.variation.create({
        data: {
          name: createVariationDto.name,
          description: createVariationDto.description,
          functionId: createVariationDto.functionId,
          prompt: createVariationDto.prompt,
          aiModel: createVariationDto.aiModel,
          framework: createVariationDto.framework,
          isActive: createVariationDto.isActive,
        },
      });

      // ファイルがある場合は生成ファイルも作成

      const files = [
        {
          filePath: 'test.html',
          fileName: 'test.html',
          content: testHtml,
          mimeType: 'text/html',
        },
      ].map((file) => {
        const contentBytes = Buffer.byteLength(file.content, 'utf8');

        return {
          variationId: variation.id,
          filePath: file.filePath,
          fileName: file.fileName,
          content: file.content,
          fileSize: contentBytes,
          mimeType: file.mimeType,
          storageType: 'db',
        };
      });

      await tx.generatedFile.createMany({
        data: files,
      });

      return variation;
    });
  }

  async createVariationWithFiles(
    userId: string,
    createVariationWithFilesDto: CreateVariationWithFilesDto,
  ): Promise<Variation> {
    // 関数が存在し、ユーザーがアクセス権を持っていることを確認
    const func = await this.prisma.function.findUnique({
      where: {
        id: createVariationWithFilesDto.functionId,
        project: {
          userId,
        },
      },
    });

    if (!func) {
      throw new NotFoundException('Function not found or access denied');
    }

    return this.prisma.$transaction(async (tx) => {
      // バリエーションを作成
      const variation = await tx.variation.create({
        data: {
          name: createVariationWithFilesDto.name,
          description: createVariationWithFilesDto.description,
          functionId: createVariationWithFilesDto.functionId,
          prompt: createVariationWithFilesDto.prompt,
          aiModel: createVariationWithFilesDto.aiModel,
          framework: createVariationWithFilesDto.framework,
          isActive: createVariationWithFilesDto.isActive,
        },
      });

      // ファイルがある場合は生成ファイルも作成
      if (
        createVariationWithFilesDto.files &&
        createVariationWithFilesDto.files.length > 0
      ) {
        const files = createVariationWithFilesDto.files.map((file) => {
          const contentBytes = Buffer.byteLength(file.content, 'utf8');

          // 1MB未満の場合はDBに保存、それ以上の場合はエラー（S3未実装のため）
          if (contentBytes >= 1024 * 1024) {
            throw new BadRequestException(
              `File ${file.fileName} is too large (${contentBytes} bytes). Maximum size is 1MB.`,
            );
          }

          return {
            variationId: variation.id,
            filePath: file.filePath,
            fileName: file.fileName,
            content: file.content,
            fileSize: contentBytes,
            mimeType: file.mimeType,
            storageType: 'db',
          };
        });

        await tx.generatedFile.createMany({
          data: files,
        });
      }

      return variation;
    });
  }

  async getVariation(
    userId: string,
    id: string,
  ): Promise<Variation & { files: GeneratedFile[] }> {
    const variation = await this.prisma.variation.findUnique({
      where: {
        id,
        function: {
          project: {
            userId,
          },
        },
      },
      include: {
        files: true,
      },
    });

    if (!variation) {
      throw new NotFoundException('Variation not found');
    }

    return variation;
  }

  async getVariationsByFunction(
    userId: string,
    functionId: string,
  ): Promise<Variation[]> {
    // 関数が存在し、ユーザーがアクセス権を持っていることを確認
    const func = await this.prisma.function.findUnique({
      where: {
        id: functionId,
        project: {
          userId,
        },
      },
    });

    if (!func) {
      throw new NotFoundException('Function not found or access denied');
    }

    return this.prisma.variation.findMany({
      where: {
        functionId,
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateVariation(
    userId: string,
    id: string,
    updateData: Partial<CreateVariationDto>,
  ): Promise<Variation> {
    // バリエーションが存在し、ユーザーがアクセス権を持っていることを確認
    const variation = await this.prisma.variation.findUnique({
      where: {
        id,
        function: {
          project: {
            userId,
          },
        },
      },
    });

    if (!variation) {
      throw new NotFoundException('Variation not found');
    }

    return this.prisma.variation.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteVariation(userId: string, id: string): Promise<void> {
    // バリエーションが存在し、ユーザーがアクセス権を持っていることを確認
    const variation = await this.prisma.variation.findUnique({
      where: {
        id,
        function: {
          project: {
            userId,
          },
        },
      },
    });

    if (!variation) {
      throw new NotFoundException('Variation not found');
    }

    await this.prisma.variation.delete({
      where: { id },
    });
  }
}
