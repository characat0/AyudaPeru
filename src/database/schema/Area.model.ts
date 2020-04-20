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
    type: DataType.STRING({ length: 10 }),
    primaryKey: true,
    allowNull: false
  })
  id: string;

  @Column({
    type: DataType.GEOMETRY('POLYGON', 4326),
    allowNull: false
  })
  geometria: object

  @Column({
    type: DataType.JSON,
    allowNull: true
  })
  propiedades?: object
}