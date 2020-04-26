import { Inject, Injectable } from '@nestjs/common';
import { sequelizeToken } from '../../constants';
import { Sequelize } from 'sequelize-typescript';
import { Distrito } from '../../database/schema/Distrito.model';

@Injectable()
export class DistritoService {
  public static readonly notFoundError: Error = new Error("Distrito not found.");
  constructor(@Inject(sequelizeToken) private readonly sequelize: Sequelize) {}

  async findAll(): Promise<string[]> {
    return (await Distrito.findAll({ attributes: ['id'] })).map(code => code.get('id'));
  }

  findById(id: string): Promise<Distrito> {
    return Distrito.findByPk(id, { rejectOnEmpty: DistritoService.notFoundError });
  }

  async findByLatLong(latitude: number, longitude: number): Promise<Distrito> {
    return this.sequelize.transaction(async transaction => {
      await this.sequelize.query(`SET @point=ST_POINTFROMTEXT('POINT(? ?)')`,
        { replacements: [longitude, latitude], transaction }
      );

      const codigo: Distrito = await Distrito.findOne({
        where: Sequelize.literal(`ST_WITHIN(@point, geometria)`),
        rejectOnEmpty: DistritoService.notFoundError,
        transaction
      });
      await this.sequelize.query(`SET @point=NULL`, { transaction });
      return codigo;
    });
  }
}
