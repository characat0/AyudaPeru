import { TokenInterceptor } from './token.interceptor';
import { AuthService } from '../../auth/auth.service';
import { CredencialService } from '../../auth/credencial/credencial.service';
import { JwtService } from '../../auth/jwt/jwt.service';
import { RefreshtokenService } from '../../auth/refreshtoken/refreshtoken.service';
import { Test } from '@nestjs/testing';

describe('TokenInterceptor', () => {
  let credencialService: CredencialService;
  let jwtService: JwtService;
  let refreshtokenService: RefreshtokenService;
  let authService: AuthService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CredencialService, JwtService, RefreshtokenService, AuthService],
    }).compile();
    credencialService = moduleRef.get(CredencialService);
    jwtService = moduleRef.get(JwtService);
    refreshtokenService = moduleRef.get(RefreshtokenService);
    authService = moduleRef.get(AuthService);
  });

  it('should be defined', () => {
    expect(new TokenInterceptor(authService)).toBeDefined();
  });
});
