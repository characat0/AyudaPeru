import { Sequelize } from "sequelize-typescript";
import { sequelizeToken } from "../constants";
import { databaseConfig, ENV } from '../config';
import { Distrito } from './schema/Distrito.model';
import { PostCode } from './schema/PostCode.model';
import { Area } from './schema/Area.model';
import { Credencial } from './schema/Credencial.model';
import { Usuario } from './schema/Usuario.model';
import { genSalt, hash } from 'bcryptjs';
import { RefreshToken } from './schema/RefreshToken.model';
import { DistritoArea } from './schema/DistritoArea.model';
import { Ayuda } from './schema/Ayuda.model';
import { FactoryProvider } from '@nestjs/common';
import { Comentario } from './schema/Comentario.model';

const sequelize = new Sequelize(databaseConfig);
sequelize.addModels([
  Distrito,
  PostCode,
  Area,
  Credencial,
  Usuario,
  RefreshToken,
  DistritoArea,
  Ayuda,
  Comentario
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

Credencial.hasMany(RefreshToken, { foreignKey: { name: 'credencialId' }});
RefreshToken.belongsTo(Credencial, { foreignKey: { name: 'credencialId' }});

Area.belongsToMany(Distrito, { through: DistritoArea, foreignKey: { name: 'areaId' } });
Distrito.belongsToMany(Area, { through: DistritoArea, foreignKey: { name: 'distritoId' } });

Ayuda.belongsTo(Usuario, { foreignKey: { name: 'usuarioId' }});
Ayuda.belongsTo(Area, { foreignKey: { name: 'areaId' }});

Usuario.hasMany(Comentario, { foreignKey: 'usuarioId' });
Area.hasMany(Comentario, { foreignKey: 'areaId' });

Comentario.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Comentario.belongsTo(Area, { foreignKey: 'areaId' });

export const databaseProvider: FactoryProvider = {
  provide: sequelizeToken,
  useFactory: async () => {
    ENV === 'prod' ? await sequelize.authenticate() : await sequelize.sync();
    return sequelize;
  }
};