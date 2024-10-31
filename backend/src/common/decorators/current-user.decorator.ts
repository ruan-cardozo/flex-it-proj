import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../../modules/auth/models/AuthRequest';
import { User } from 'src/modules/user/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
