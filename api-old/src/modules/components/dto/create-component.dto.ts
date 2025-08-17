import { z } from 'zod';

export const createComponentSchema = z.object({
  name: z.string().min(1).max(100),
  projectId: z.string().min(1),
  description: z.string().max(500).optional(),
});

export type CreateComponentDto = z.infer<typeof createComponentSchema>;
