import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: "distrito-area",
  timestamps: false,
  underscored: true
})
export class DistritoArea extends Model<DistritoArea> {
  @Column({
    type: DataType.STRING({ length: 10 }),
    allowNull: false,
    primaryKey: true
  })
  public distritoId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true
  })
  public areaId: string;
}