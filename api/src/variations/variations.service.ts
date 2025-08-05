import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVariationDto } from './dto/create-variation.dto';
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
}
