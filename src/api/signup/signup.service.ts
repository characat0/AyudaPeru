import { Injectable } from '@nestjs/common';
import { CredencialService } from '../../auth/credencial/credencial.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class SignupService {
  constructor(private credencialService: CredencialService, private usersService: UsersService) {}

  async signUp(credenciales: { email: string, password: string }, usuario?: object): Promise<string> {
    const id = await this.credencialService.create(credenciales);
    const user = await this.usersService.createUsuario({ id })
    if (!usuario) return id;
    if (usuario['id']) delete usuario['id'];
    await user.update(usuario);
    // Todo send e-mail for verification
    return id;
  }

}
