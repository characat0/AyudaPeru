import { Inject, Injectable } from '@nestjs/common';
import { sequelizeToken } from '../../constants';
import { Sequelize } from 'sequelize-typescript';
import { Area } from '../../database/schema/Area.model';
import { stringify } from 'wkt';
import { Comentario } from '../../database/schema/Comentario.model';
import { Usuario } from '../../database/schema/Usuario.model';

@Injectable()
export class AreaService {
  public static readonly notFoundError: Error = new Error("Area not found.");
  public static readonly notAffectedRowsError: Error = new Error("0 Area rows affected.");
  constructor(@Inject(sequelizeToken) private readonly sequelize: Sequelize) {}

  findAll(): Promise<Area[]> {
    return Area.findAll({
      include: [
        {
          model: Comentario,
          attributes: ['texto', 'createdAt'],
          include: [
            { model: Usuario, attributes: Usuario.publicFields }
            ]
        }
      ]
    });
  }

  async findAllIds(): Promise<string[]> {
    return (await Area.findAll({
      attributes: ['id']
    })).map(area => area.get('id'));
  }

  findById(id: string): Promise<Area> {
    return Area.findByPk(id, {
      rejectOnEmpty: AreaService.notFoundError,
      include: [
        {
          model: Comentario,
          attributes: ['texto', 'createdAt'],
          include: [
            { model: Usuario, attributes: Usuario.publicFields }
          ]
        }
      ]
    });
  }

  async findByLatLong(latitude: number, longitude: number): Promise<Area> {
    return this.sequelize.transaction(async transaction => {
      await this.sequelize.query(`SET @point=ST_POINTFROMTEXT('POINT(? ?)')`,
        { replacements: [longitude, latitude], transaction }
      );

      const codigo: Area = await Area.findOne({
        where: Sequelize.literal(`ST_WITHIN(@point, geometria)`),
        rejectOnEmpty: AreaService.notFoundError,
        transaction
      });
      await this.sequelize.query(`SET @point=NULL`, { transaction });
      return codigo;
    });
  }

  async updateArea(id: string, body: Area): Promise<number> {
    delete body.id;
    let { geometria } = body;
    if (!geometria) {
      const [ numero ] = await Area.update(body, { where: { id }});
      if (numero === 0) {
        throw AreaService.notAffectedRowsError;
      }
      return numero;
    }
    if (typeof geometria === 'object') {
      geometria = stringify(geometria);
    }
    delete body.geometria;

    return this.sequelize.transaction(async transaction => {
      await this.sequelize.query(`SET @p=ST_POLYGONFROMTEXT(?);`,
        { replacements: [geometria], transaction });
      const [ numero ] = await Area.update({ geometria: Sequelize.literal('@p'), ...body },
        { where: { id }, transaction });
      await this.sequelize.query(`SET @p=NULL;`, { transaction });
      if (numero === 0) {
        throw AreaService.notAffectedRowsError;
      }
      return numero;
    });
  }

  async createArea(geometria: string | object, propiedades: object = null): Promise<Area> {
    if (typeof geometria === 'object') {
      geometria = stringify(geometria);
    }
    return this.sequelize.transaction(async transaction => {
      await this.sequelize.query(`SET @p=ST_POLYGONFROMTEXT(?);`,
        { replacements: [geometria], transaction });
      const area = await Area.create({ geometria: Sequelize.literal('@p'), propiedades },
        { transaction });
      await this.sequelize.query(`SET @p=NULL;`, { transaction });
      return area;
    });
  }

  async deleteArea(id: string): Promise<number> {
    const numero = await Area.destroy({ where: { id }});
    if (numero === 0) {
      throw AreaService.notAffectedRowsError;
    }
    return numero;
  }
}
