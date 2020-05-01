import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      if (!(req['user'])) {
        return false;
      }
      const { credentials } : { credentials: { id: string } } = req['user'];
      if (credentials.id) {
        return true;
      }
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
