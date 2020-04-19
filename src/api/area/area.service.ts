import { Inject, Injectable } from '@nestjs/common';
import { sequelizeToken } from '../../constants';
import { Sequelize } from 'sequelize-typescript';
import { Distrito } from '../../database/schema/Distrito.model';
import { Area } from '../../database/schema/Area.model';
import { stringify } from 'wkt';

@Injectable()
export class AreaService {
  public readonly notFoundError: Error;
  public readonly notAffectedRowsError: Error;
  constructor(@Inject(sequelizeToken) private readonly sequelize: Sequelize) {
    this.notFoundError = new Error("Area not found.");
    this.notAffectedRowsError = new Error("0 Area rows affected.");
  }

  async findAll(): Promise<number[]> {
    return (await Distrito.findAll({ attributes: ['id'] })).map(distrito => distrito.get('id'));
  }

  findById(id: number): Promise<Area> {
    return Area.findByPk(id, { rejectOnEmpty: this.notFoundError });
  }

  async findByLatLong(latitude: number, longitude: number): Promise<Area> {
    return this.sequelize.transaction(async transaction => {
      await this.sequelize.query(`SET @point=ST_POINTFROMTEXT('POINT(? ?)')`,
        { replacements: [longitude, latitude], transaction }
      );

      const codigo: Area = await Area.findOne({
        where: Sequelize.literal(`ST_WITHIN(@point, geometria)`),
        rejectOnEmpty: this.notFoundError,
        transaction
      });
      await this.sequelize.query(`SET @point=NULL`, { transaction });
      return codigo;
    });
  }

  async updateArea(id: number, geometria: string | object): Promise<number> {
    if (typeof geometria === 'object') {
      geometria = stringify(geometria);
    }
    return this.sequelize.transaction(async transaction => {
      await this.sequelize.query(`SET @p=ST_POLYGONFROMTEXT(?);`,
        { replacements: [geometria], transaction });
      const [ numero ] = await Area.update({ geometria: Sequelize.literal('@p') },
        { where: { id }, fields: ['geometria'], transaction });
      await this.sequelize.query(`SET @p=NULL;`, { transaction });
      if (numero === 0) {
        throw this.notAffectedRowsError;
      }
      return numero;
    });
  }

  async createArea(id: number, geometria: string | object): Promise<void> {
    if (typeof geometria === 'object') {
      geometria = stringify(geometria);
    }
    return this.sequelize.transaction(async transaction => {
      await this.sequelize.query(`SET @p=ST_POLYGONFROMTEXT(?);`,
        { replacements: [geometria], transaction });
      await Area.create({ geometria: Sequelize.literal('@p'), id },
        { transaction });
      await this.sequelize.query(`SET @p=NULL;`, { transaction });
    });
  }

  async deleteArea(id: number): Promise<number> {
    const numero = await Area.destroy({ where: { id }});
    if (numero === 0) {
      throw this.notAffectedRowsError;
    }
    return numero;
  }
}
