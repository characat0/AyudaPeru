import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { Request } from 'express';
import { Contactable } from '../interfaces/contactable.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const credentials: Contactable = req.body.credentials;
    try {
      if (credentials) return await this.authService.verifyState(credentials);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
    throw new UnauthorizedException("Invalid Credentials.");
  }
}
