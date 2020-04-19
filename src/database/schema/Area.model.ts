import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: "area",
  underscored: true,
  timestamps: true,
  paranoid: true,
  indexes: [{type: 'SPATIAL', fields: [{ name:'geometria' }] }]
})
export class Area extends Model<Area> {
  @Column({
    type: DataType.INTEGER({ unsigned: true }),
    primaryKey: true,
    allowNull: false
  })
  id: number;

  @Column({
    type: DataType.GEOMETRY('POLYGON', 4326),
    allowNull: false
  })
  geometria: object
}