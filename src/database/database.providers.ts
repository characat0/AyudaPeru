import { Sequelize } from "sequelize-typescript";
import { sequelizeToken } from "../constants";
import { databaseConfig } from "../config";
import { Distrito } from './schema/Distrito.model';
import { PostCode } from './schema/PostCode.model';
import { Area } from './schema/Area.model';


const sequelize = new Sequelize(databaseConfig);
sequelize.addModels([
  Distrito,
  PostCode,
  Area
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