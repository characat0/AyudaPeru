import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '../../auth/jwt/jwt.service';

@Injectable()
export class BearerMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    if (!authorization) return next();
    const [ type, token ] = authorization.split(' ');
    if (token && type === 'Bearer') {
      try {
        req.body.credentials = await this.jwtService.verify<{id: string}>(token);
      } catch (e) {}
    }
    next();
  }
}
