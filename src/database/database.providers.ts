import { Sequelize } from "sequelize-typescript";
import { sequelizeToken } from "../constants";
import { databaseConfig } from "../config";
import { CodigoPostal } from './schema/CodigoPostal';


const sequelize = new Sequelize(databaseConfig);
sequelize.addModels([
  CodigoPostal
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