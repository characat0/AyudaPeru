import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { BelongsToGetAssociationMixin } from 'sequelize';
import { Credencial } from './Credencial.model';
import { v1 } from 'uuid';


@Table({
  tableName: 'refresh_token',
  underscored: true,
  timestamps: true,
  updatedAt: false,
  paranoid: true,
  indexes: [
    { unique: false, fields: [ { name: 'credencial_id' } ] }
  ]
})
export class RefreshToken extends Model<RefreshToken> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: v1
  })
  id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: v1
  })
  state: string;

  @Column({
    type: DataType.SMALLINT({ unsigned: true }),
    allowNull: false,
    defaultValue: 0
  })
  uses: number;

  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  credencialId: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: () => new Date(Date.now())
  })
  expires: Date;

  public readonly createdAt!: Date;
  public getCredencial!: BelongsToGetAssociationMixin<Credencial>;
  readonly credencial?: Credencial;
}