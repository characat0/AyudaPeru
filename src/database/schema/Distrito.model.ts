import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: "distrito",
  underscored: true,
  timestamps: true,
  updatedAt: false,
  paranoid: true,
  indexes: [{type: 'SPATIAL', fields: [{ name:'geometria' }] }]
})
export class Distrito extends Model<Distrito> {
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