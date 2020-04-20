import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: "postcode",
  underscored: true,
  timestamps: true,
  updatedAt: false,
  paranoid: true,
  indexes: [{type: 'SPATIAL', fields: [{ name:'geometria' }] }]
})
export class PostCode extends Model<PostCode> {
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