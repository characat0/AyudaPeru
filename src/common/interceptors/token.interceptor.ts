import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { Request } from 'express';
import { Contactable } from '../interfaces/contactable.interface';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const credentials: Contactable = req.body.credentials;
    return next
      .handle()
      .pipe(map(async v => {
        const token = await this.authService.getNewToken(credentials);
        return ({ data: v, newToken: token })
      }));
  }
}
