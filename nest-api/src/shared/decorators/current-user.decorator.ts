import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AuthUser } from '@/shared/types/auth.types';

interface RequestWithUser extends Request {
  user: AuthUser;
}

type UserProperty = keyof AuthUser;

export const CurrentUser = createParamDecorator(
  (data: UserProperty | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;
    if (data) {
      return user[data];
    }
    return user;
  },
);
