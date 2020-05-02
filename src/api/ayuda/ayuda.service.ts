import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { Ayuda } from '../../database/schema/Ayuda.model';
import { Usuario } from '../../database/schema/Usuario.model';

@Injectable()
export class AyudaService {
  static readonly notFoundError: Error = new Error("Ayuda not found.");
  static readonly ayudaAttributes = { exclude: ['updatedAt', 'createdAt', 'deletedAt', 'usuarioId', 'verified'] };
  static readonly ayudaInclude = [{model: Usuario, attributes: ['nombres', 'apellidos'] }];

  async create(body: Ayuda) {
    delete body.id;
    return Ayuda.create(body);
  }

  async getAll() {
    return Ayuda.findAll({
      where: { verified: true },
      attributes: AyudaService.ayudaAttributes,
      include: AyudaService.ayudaInclude
    });
  }

  async findNotFinished() {
    const now = new Date(Date.now());
    return Ayuda.findAll({
      where: { finish: { [Op.gt] : now }, verified: true },
      attributes: AyudaService.ayudaAttributes,
      include: AyudaService.ayudaInclude
    });
  }

  async findActive() {
    const now = new Date(Date.now());
    return Ayuda.findAll({
      where: { finish: {[Op.gt]: now}, start: {[Op.lt]: now}, verified: true },
      attributes: AyudaService.ayudaAttributes,
      include: AyudaService.ayudaInclude
    });
  }

  async findById(id: string) {
    return Ayuda.findOne({
      where: { id, verified: true },
      rejectOnEmpty: AyudaService.notFoundError,
      attributes: AyudaService.ayudaAttributes,
      include: AyudaService.ayudaInclude
    });
  }

  async findByUser(usuarioId: string) {
    return Ayuda.findAll({
      where: { usuarioId },
      attributes: AyudaService.ayudaAttributes,
      include: AyudaService.ayudaInclude
    });
  }

  async deleteById(id: string) {
    if (!id) throw AyudaService.notFoundError;
    return Ayuda.destroy({ where: { id }});
  }

  async findByArea(areaId: string) {
    return Ayuda.findAll({
      where: { areaId },
      attributes: AyudaService.ayudaAttributes,
      include: AyudaService.ayudaInclude
    });
  }

  async updateById(id: string, body: Ayuda) {
    delete body.id;
    const [ number ] = await Ayuda.update(body, { where: { id }});
    if (number === 0) {
      throw AyudaService.notFoundError;
    }
  }
}
