import { Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class VerifyService {
  constructor(private authService: AuthService) {}
  async verify(id: string) {
    return this.authService.verifyFromId(id);
  }
}
