import { Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class LoginService {
  constructor(private authService: AuthService) {}

  async login(credenciales: { email: string, password: string }) {
    return this.authService.validateCredentials(credenciales);
  }

  getJwt(credenciales: { email: string }) {
    const { email } = credenciales
    return this.authService.getJwt(email);
  }

}
