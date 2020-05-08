import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { v1 } from 'uuid';
import { Usuario } from './Usuario.model';
import { Area } from './Area.model';

@Table({
  tableName: 'comentario',
  underscored: true,
  timestamps: true,
  updatedAt: false
})
export class Comentario extends Model<Comentario> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: v1
  })
  public readonly id: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  public readonly texto: string;

  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  public readonly areaId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  public readonly usuarioId: string;

  public readonly Usuario?: Usuario;

  public readonly Area?: Area;

  public readonly createdAt!: Date;
}