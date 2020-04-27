import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Request } from 'express';

@Injectable()
export class AccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const { credentials } : { credentials: { id: string } } = req.body;
      if (credentials.id) {
        return true;
      }
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
    throw new UnauthorizedException("Invalid credentials.");
  }
}
