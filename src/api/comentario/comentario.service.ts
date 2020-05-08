import { Injectable } from '@nestjs/common';
import { Comentario } from '../../database/schema/Comentario.model';
import { Usuario } from '../../database/schema/Usuario.model';

@Injectable()
export class ComentarioService {

  async findAllByAreaId(areaId: string) {
    return Comentario.findAll({
      where: { areaId },
      include: [
        { model: Usuario, attributes: { exclude: ['updatedAt', 'createdAt', 'deletedAt', 'fotoPerfil', 'id'] }}
      ],
      attributes: ['texto', 'createdAt']
    })
  };

  async createComentario(body: { areaId: string, usuarioId: string, texto: string}) {
    return Comentario.create(body);
  }


}
