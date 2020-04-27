import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CredencialService } from '../../auth/credencial/credencial.service';
import { LoginService } from './login.service';
import { AuthService } from '../../auth/auth.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() body: { email: string, password: string }): Promise<object> {
    try {
      const { email, password } = body;
      const credencial = await this.loginService.login({ email, password });
      const id = credencial.get('id');
      const refreshToken = await this.loginService.createRefreshToken(id);
      const accessToken = await this.loginService.getAccessToken(id);
      return {
        refreshToken: refreshToken,
        accessToken: accessToken,
        refreshTokenExpiration: AuthService.refreshTokenExpiration,
        accessTokenExpiration: AuthService.accessTokenExpiration
      }
    } catch (e) {
      let exception = new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      if (e.message === CredencialService.invalidCredentialError.message) {
        exception = new HttpException(e.message, HttpStatus.UNAUTHORIZED);
      } else if (e.message === CredencialService.notFoundError.message) {
        exception = new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
      throw exception;
    }
  }
}
