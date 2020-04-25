import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { v1 } from 'uuid';

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
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: v1
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