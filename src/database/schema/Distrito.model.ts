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

}