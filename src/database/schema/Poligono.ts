import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: "poligono",
  underscored: true,
  timestamps: true,
  updatedAt: false
})
export class Poligono extends Model<Poligono> {
  @Column({
    type: DataType.INTEGER({ unsigned: true }),
    primaryKey: true
  })
  id: number;

  @Column({
    type: DataType.GEOGRAPHY({ type: 'POLYGON' }),
    allowNull: false
  })
  poligono: string
}
