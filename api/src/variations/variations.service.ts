import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../core/database/prisma/prisma.service';
import { AnthropicService } from '../anthropic/anthropic.service';
import { CreateVariationDto } from './dto/create-variation.dto';
import { Variation, GeneratedFile } from '@prisma/client';

const createPrompt = (prompt: string) => {
  return `HTMLのみを生成してください。以下の要件を満たしてください：

1. <html>タグで囲うこと
2. CSS、JavaScriptは<html>タグ内に記述すること（<style>タグや<script>タグを使用）
3. 完全なHTMLドキュメントとして生成すること
4. レスポンシブデザインを考慮すること

ユーザーからの要求：
${prompt}

注意：HTMLコード以外は一切出力しないでください。説明文やマークダウンのコードブロック記法も不要です。`;
};

const validateHtmlContent = (content: string): void => {
  const trimmedContent = content.trim();

  if (!trimmedContent.startsWith('<html')) {
    throw new BadRequestException(
      'Generated content must start with <html> tag',
    );
  }

  if (!trimmedContent.endsWith('</html>')) {
    throw new BadRequestException(
      'Generated content must end with </html> tag',
    );
  }
};

@Injectable()
export class VariationsService {
  constructor(
    private prisma: PrismaService,
    private anthropicService: AnthropicService,
  ) {}

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

    // Anthropic APIを使用してcontentを生成（トランザクション外）
    const generatedContent = await this.anthropicService.createMessage(
      createPrompt(createVariationDto.prompt),
      createVariationDto.aiModel || 'claude-3-haiku-20240307',
    );

    // 生成されたcontentをバリデーション
    validateHtmlContent(generatedContent);

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

      // 生成されたcontentでファイルを作成
      const files = [
        {
          filePath: 'generated.html',
          fileName: 'generated.html',
          content: generatedContent,
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
}
