import { Inject, Injectable } from '@nestjs/common';
import { sequelizeToken } from '../../constants';
import { Sequelize } from 'sequelize-typescript';
import { PostCode } from '../../database/schema/PostCode.model';

@Injectable()
export class PostcodeService {
  public readonly notFoundError: Error;
  constructor(@Inject(sequelizeToken) private readonly sequelize: Sequelize) {
    this.notFoundError = new Error("PostCode not found.");
  }

  findAll(): Promise<string[]> {
    return PostCode.findAll({ attributes: ['id'] }).map(code => code.get('id'));
  }

  findById(id: string): Promise<PostCode> {
    return PostCode.findByPk(id, { rejectOnEmpty: this.notFoundError });
  }

  async findByLatLong(latitude: number, longitude: number): Promise<PostCode> {
    return this.sequelize.transaction(async transaction => {
      await this.sequelize.query(`SET @point=ST_POINTFROMTEXT('POINT(? ?)')`,
        { replacements: [longitude, latitude], transaction }
        );

      const codigo: PostCode = await PostCode.findOne({
        where: Sequelize.literal(`ST_WITHIN(@point, geometria)`),
        rejectOnEmpty: this.notFoundError,
        transaction
      });
      await this.sequelize.query(`SET @point=NULL`, { transaction });
      return codigo;
    })
  }
}
