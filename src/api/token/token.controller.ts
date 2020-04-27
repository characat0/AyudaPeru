import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Post('regenerate')
  async regenerateToken(@Body() body: { refresh_token: string }) {
    try {
      const { refresh_token } = body;
      return await this.tokenService.regenerateRefreshToken(refresh_token);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    }
  }

}
