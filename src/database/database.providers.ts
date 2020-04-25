import { Sequelize } from "sequelize-typescript";
import { sequelizeToken } from "../constants";
import { databaseConfig } from "../config";
import { Distrito } from './schema/Distrito.model';
import { PostCode } from './schema/PostCode.model';
import { Area } from './schema/Area.model';
import { Credencial } from './schema/Credencial.model';
import { Usuario } from './schema/Usuario.model';
import { genSalt, hash } from 'bcryptjs';

const sequelize = new Sequelize(databaseConfig);
sequelize.addModels([
  Distrito,
  PostCode,
  Area,
  Credencial,
  Usuario
]);

Credencial.beforeCreate('hashPassword', async (credencial) => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(credencial.get('password'), salt);
  credencial.set('password', hashedPassword);
});
Usuario.beforeValidate('acomodaSexo', (usuario) => {
  let sexo: string = usuario.get('sexo');
  if (!sexo) {
    usuario.set('sexo', null);
    return;
  }
  sexo = sexo.toUpperCase();
  if (sexo !== 'M' && sexo !== 'F') return;
  usuario.set('sexo', sexo);
});

Credencial.hasOne(Usuario, { foreignKey: { name: 'id' }});
Usuario.belongsTo(Credencial, { foreignKey: { name: 'id' }});


export const databaseProviders = {
  provide: sequelizeToken,
  useFactory: async () => {
    await sequelize.authenticate();
    return sequelize;
  }
};