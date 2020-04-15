import { Sequelize } from "sequelize-typescript";
import { sequelizeToken } from "../constants";
import { databaseConfig } from "../config";
import { Poligono } from './schema/Poligono';


const sequelize = new Sequelize(databaseConfig);
sequelize.addModels([
  Poligono
]);

export const databaseProviders = [
  {
    provide: sequelizeToken,
    useFactory: async () => {
      await sequelize.sync();
      return sequelize;
    }
  }
];