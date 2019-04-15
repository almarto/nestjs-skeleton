import { CanActivate, ExecutionContext } from '@nestjs/common';

import { AppError } from 'src/common/error/AppError';
import { AppErrorTypeEnum } from 'src/common/error/AppErrorTypeEnum';

export class SessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    try {
      if (request.session.passport.user) return true;
    } catch (e) {
      throw new AppError(AppErrorTypeEnum.NOT_IN_SESSION);
    }
  }
}
