import { BearerMiddleware } from './bearer.middleware';
import { JwtService } from '../../auth/jwt/jwt.service';

describe('BearerMiddleware', () => {
  let jwtService: JwtService = new JwtService();

  it('should be defined', () => {
    expect(new BearerMiddleware(jwtService)).toBeDefined();
  });
});
