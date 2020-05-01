import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { Ayuda } from '../../database/schema/Ayuda.model';

@Injectable()
export class AyudaService {
  static readonly notFoundError: Error = new Error("Ayuda not found.");

  async create(body: Ayuda) {
    delete body.id;
    return Ayuda.create(body);
  }

  async getAll() {
    return Ayuda.findAll();
  }

  async findNotFinished() {
    const now = new Date(Date.now());
    return Ayuda.findAll({ where: { finish: { [Op.gt] : now } } });
  }

  async findActive() {
    const now = new Date(Date.now());
    return Ayuda.findAll({ where: { finish: {[Op.gt]: now}, start: {[Op.lt]: now}} });
  }

  async findById(id: string) {
    return Ayuda.findByPk(id, { rejectOnEmpty: AyudaService.notFoundError});
  }

  async findByUser(usuarioId: string) {
    return Ayuda.findAll({ where: { usuarioId }});
  }

  async deleteById(id: string) {
    if (!id) throw AyudaService.notFoundError;
    return Ayuda.destroy({ where: { id }});
  }

  async findByArea(areaId: string) {
    return Ayuda.findAll({ where: { areaId }});
  }

  async updateById(id: string, body: Ayuda) {
    delete body.id;
    const [ number ] = await Ayuda.update(body, { where: { id }});
    if (number === 0) {
      throw AyudaService.notFoundError;
    }
  }
}
