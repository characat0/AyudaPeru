import { AuthGuard } from './auth.guard';
import { CredencialService } from '../../auth/credencial/credencial.service';
import { JwtService } from '../../auth/jwt/jwt.service';
import { RefreshtokenService } from '../../auth/refreshtoken/refreshtoken.service';
import { AuthService } from '../../auth/auth.service';

describe('AuthGuard', () => {
  let credencialService: CredencialService = new CredencialService();
  let jwtService: JwtService = new JwtService();
  let refreshtokenService: RefreshtokenService = new RefreshtokenService();
  let authService: AuthService = new AuthService(credencialService, jwtService, refreshtokenService);
  it('should be defined', () => {
    expect(new AuthGuard(authService)).toBeDefined();
  });
});
