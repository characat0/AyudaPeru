import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty()
  @Column({
    type: DataType.GEOMETRY('POLYGON', 4326),
    allowNull: false
  })
  geometria: object
}