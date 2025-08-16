import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { z } from 'zod';

interface ValidationErrorDetail {
  field: string;
  message: string;
  code: string;
  received?: unknown;
}

interface ValidationErrorResponse {
  message: string;
  errors: ValidationErrorDetail[];
  statusCode: number;
  timestamp: string;
  path: string;
}

const isProduction = process.env.NODE_ENV === 'production';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(
    private schema: z.ZodType,
    private options: { enableLogging?: boolean } = {},
  ) {}

  transform(value: any, metadata: ArgumentMetadata) {
    // デバッグログ（開発環境のみ）
    if (this.options.enableLogging || !isProduction) {
      console.log(`🔍 [${metadata.type}] ZodValidationPipe実行:`, {
        type: metadata.type,
        data: value as unknown,
      });
    }

    try {
      const result = this.schema.parse(value);

      if (this.options.enableLogging || !isProduction) {
        console.log('✅ バリデーション成功:', result);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // 詳細なエラー情報を構築
        const errors: ValidationErrorDetail[] = error.issues.map((issue) => ({
          field: issue.path.length > 0 ? issue.path.join('.') : 'root',
          message: issue.message,
          code: issue.code,
          received:
            issue.code === 'invalid_type' && 'received' in issue
              ? issue.received
              : undefined,
        }));

        const errorResponse: ValidationErrorResponse = {
          message: 'Validation failed',
          errors,
          statusCode: 400,
          timestamp: new Date().toISOString(),
          path: metadata.type || 'unknown',
        };

        if (this.options.enableLogging || !isProduction) {
          console.log('❌ バリデーション失敗:', {
            type: metadata.type,
            errors: errors.map((e) => `${e.field}: ${e.message}`),
          });
        }

        throw new BadRequestException(errorResponse);
      }

      // Zod以外のエラー
      throw new BadRequestException({
        message: 'Unexpected validation error',
        errors: [
          {
            field: 'unknown',
            message: 'Internal validation error',
            code: 'unknown',
          },
        ],
        statusCode: 400,
        timestamp: new Date().toISOString(),
        path: metadata.type || 'unknown',
      });
    }
  }
}

// ヘルパー関数: よく使うパイプの作成
export const createZodPipe = (schema: z.ZodType, enableLogging = false) => {
  return new ZodValidationPipe(schema, { enableLogging });
};
