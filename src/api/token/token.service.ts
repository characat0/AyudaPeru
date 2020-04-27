import { Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class TokenService {
  constructor(private authService: AuthService) {}

  async regenerateRefreshToken(refreshToken: string) {
    const token = await this.authService.decodeRefreshToken(refreshToken);
    const newRefreshToken = await this.authService.getNewRefreshToken(token);
    const newAccessToken = await this.authService.getNewAccessToken(token.credencialId);
    return {
      refreshToken: newRefreshToken,
      accessToken: newAccessToken,
      refreshTokenExpiration: AuthService.refreshTokenExpiration,
      accessTokenExpiration: AuthService.accessTokenExpiration
    }
  }

}
