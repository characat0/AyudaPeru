import { Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class LoginService {
  constructor(private authService: AuthService) {}

  async login(credenciales: { email: string, password: string }) {
    return this.authService.validateCredentials(credenciales);
  }

  createRefreshToken(credencialId: string) {
    return this.authService.createRefreshToken(credencialId);
  }

  getAccessToken(credencialId: string) {
    return this.authService.getNewAccessToken(credencialId);
  }
}
