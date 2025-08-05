import { z } from 'zod';

export const createVariationSchema = z.object({
  name: z.string().min(1).max(100),
  functionId: z.string().min(1),
  description: z.string().max(500).optional(),
  prompt: z.string().min(1).max(10000),
  aiModel: z.string().optional(),
  framework: z.string().default('vanilla'),
  isActive: z.boolean().default(true),
});

export type CreateVariationDto = z.infer<typeof createVariationSchema>;

export const createGeneratedFileSchema = z.object({
  filePath: z.string().min(1),
  fileName: z.string().min(1),
  content: z.string(),
  mimeType: z.string().default('text/html'),
});

export type CreateGeneratedFileDto = z.infer<typeof createGeneratedFileSchema>;
