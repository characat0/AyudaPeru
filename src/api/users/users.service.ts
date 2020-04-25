import { Injectable } from '@nestjs/common';
import { Usuario } from '../../database/schema/Usuario.model';

@Injectable()
export class UsersService {
  public static readonly userNotFoundError: Error = new Error("User not found.");

  getUsuarioById(id: string): Promise<object> {
    return Usuario.findByPk(id, {
      attributes: { exclude: ['updatedAt', 'createdAt', 'deletedAt', 'fotoPerfil', 'id'] },
      rejectOnEmpty: UsersService.userNotFoundError,
      raw: true
    });
  }

  createUsuario(data: object) {
    return Usuario.create(data);
  }
}
