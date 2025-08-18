// Express型拡張
import type { User } from '@prisma/client';

declare global {
  namespace Express {
    interface User extends User {}
  }
}

export {};