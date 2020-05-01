import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { v1 } from 'uuid';

@Table({
  underscored: true,
  tableName: 'ayuda',
  timestamps: true,
  paranoid: true
})
export class Ayuda extends Model<Ayuda> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: v1
  })
  public id: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  public readonly verified: boolean;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  public readonly start: Date;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  public readonly finish: Date;

  @Column({
    type: DataType.SMALLINT({ unsigned: true }),
    allowNull: false
  })
  public readonly cantidad: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  public readonly tipoAyuda: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  public readonly descripcion: string;

  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  public readonly usuarioId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  public readonly areaId: string;
}