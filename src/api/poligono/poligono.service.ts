import { Inject, Injectable } from '@nestjs/common';
import { sequelizeToken } from '../../constants';
import { Sequelize } from 'sequelize-typescript';
import { Poligono } from '../../database/schema/Poligono';

@Injectable()
export class PoligonoService {
  constructor(@Inject(sequelizeToken) private readonly sequelize: Sequelize) {}
  async findAll(): Promise<Poligono[]> {
    return Poligono.findAll();
  }
  async creaPoligono(codigoPostal: string, geometria: string): Promise<Error | undefined> {
    try {
      await Poligono.create({ id: codigoPostal, poligono: geometria });
    } catch (e) {
      return e;
    }
  }
  async findPoligono(latitud: number, longitud: number) {

  }
}
