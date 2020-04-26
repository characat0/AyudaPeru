import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CredencialService } from '../../auth/credencial/credencial.service';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() body: { email: string, password: string }): Promise<string> {
    try {
      const { email, password } = body;
      const valid = await this.loginService.login({ email, password });
      if (valid) {
        return await this.loginService.getJwt({ email });
      }
    } catch (e) {
      if (e.message === CredencialService.invalidCredentialError.message) {
        throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
      } else if (e.message === CredencialService.notFoundError.message) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    throw CredencialService.invalidCredentialError;
  }
}
