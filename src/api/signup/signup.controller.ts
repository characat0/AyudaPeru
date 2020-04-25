import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
  constructor(private signupService: SignupService) {}

  @Post()
  async signUp(@Body() body: { email: string, password: string, [propName: string]: any }): Promise<string> {
    try {
      const { email, password } = body;
      return await this.signupService.signUp({ email, password }, body);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
