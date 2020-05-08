import { Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { Ayuda } from '../../database/schema/Ayuda.model';

@Injectable()
export class VerifyService {
  static readonly ayudaAlreadyVerified = new Error("Ayuda already verified.");
  constructor(private authService: AuthService) {}
  async verify(id: string) {
    return this.authService.verifyEmailById(id);
  }

  async verifyAyuda(id: string) {
    const ayuda = await Ayuda.findByPk(id);
    if (!ayuda.get('verified')) {
      throw VerifyService.ayudaAlreadyVerified;
    }
    return ayuda.update({ verified: true });
  }
}
