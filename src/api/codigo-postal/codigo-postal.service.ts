import { Inject, Injectable } from '@nestjs/common';
import { sequelizeToken } from '../../constants';
import { Sequelize } from 'sequelize-typescript';
import { CodigoPostal } from '../../database/schema/CodigoPostal';
import { QueryTypes } from 'sequelize';

@Injectable()
export class CodigoPostalService {
  constructor(@Inject(sequelizeToken) private readonly sequelize: Sequelize) {}
  async findAll(): Promise<number[]> {
    return CodigoPostal.findAll().map(codigo => codigo.get('id'));
  }

  async findPoligonoById(id: number): Promise<object> {
    return CodigoPostal.findByPk(id, { raw: true, rejectOnEmpty: true });
  }

  async updateCodigoPostal(codigoPostal: number, geometria: string): Promise<any> {
    return this.sequelize.transaction((t) => {
      return this.sequelize.query(`SET @p=ST_POLYGONFROMTEXT(?);`,
        { replacements: [geometria], transaction: t }
      ).then(() => this.sequelize.query(`UPDATE codigo_postal SET poligono=@p WHERE id=?;`,
        { replacements: [codigoPostal], type: QueryTypes.UPDATE, transaction: t }
      ))
    })
  }

  async createCodigoPostal(codigoPostal: number, geometria: string): Promise<any> {
    return this.sequelize.transaction((t) => {
      return this.sequelize.query(`SET @p=ST_POLYGONFROMTEXT(?);`,
        { replacements: [geometria], transaction: t }
      ).then(() => this.sequelize.query(`INSERT INTO codigo_postal(id, poligono) VALUES(?,@p);`,
        { replacements: [codigoPostal], type: QueryTypes.INSERT, transaction: t }
      ))
    })
  }

  async findCodigoPostal(longitud: number, latitud: number): Promise<any> {
    if (typeof longitud !== 'number' || typeof latitud !== 'number')
      throw new Error("Longitud y latitud deben ser numeros");
    return this.sequelize.transaction(transaction => {
      return this.sequelize.query(`SET @point=ST_POINTFROMTEXT('POINT(? ?)')`,
        { replacements: [longitud, latitud], transaction }
        ).then(() => this.sequelize.query(`SELECT id FROM codigo_postal WHERE ST_WITHIN(@point, codigo_postal.poligono)`,
        { transaction, type: QueryTypes.SELECT }));
    })
  }

  async deleteCodigoPostal(id: number): Promise<number> {
    return CodigoPostal.destroy({ where: { id } });
  }
}

