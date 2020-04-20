import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: "area",
  underscored: true,
  timestamps: true,
  paranoid: true,
  indexes: [{type: 'SPATIAL', fields: [{ name:'geometria' }] }]
})
export class Area extends Model<Area> {
  @ApiProperty({ required: false })
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

  @ApiProperty({ required: false })
  @Column({
    type: DataType.JSON,
    allowNull: true
  })
  propiedades?: object
}