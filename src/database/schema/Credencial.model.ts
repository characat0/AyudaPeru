import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { compare } from 'bcryptjs';
import { v1 } from 'uuid';
import { Usuario } from './Usuario.model';
import { HasManyGetAssociationsMixin, HasOneGetAssociationMixin } from 'sequelize';
import { RefreshToken } from './RefreshToken.model';

@Table({
  tableName: 'credencial',
  underscored: true,
  timestamps: true,
  paranoid: true,
  indexes: [
    { fields: [ { name: 'email' } ], type: 'UNIQUE' }
  ]
})
export class Credencial extends Model<Credencial> {
  checkPassword(password: string): Promise<boolean> {
    return compare(password, this.get('password'));
  }

  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataType.UUID,
    defaultValue: v1
  })
  id: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  })
  email: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  verified: boolean

  readonly Usuario?: Usuario;

  public getUsuario!: HasOneGetAssociationMixin<Usuario>;

  public getRefreshTokens!: HasManyGetAssociationsMixin<RefreshToken>;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date;
}


