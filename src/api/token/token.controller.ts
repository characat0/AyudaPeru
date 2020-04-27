import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Post('regenerate')
  async regenerateToken(@Body() body: { refreshToken: string }) {
    try {
      const { refreshToken } = body;
      return await this.tokenService.regenerateRefreshToken(refreshToken);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    }
  }

}
