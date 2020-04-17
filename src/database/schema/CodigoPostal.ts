import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: "codigo_postal",
  underscored: true,
  timestamps: true,
  updatedAt: false,
  paranoid: true
})
export class CodigoPostal extends Model<CodigoPostal> {
  toJSON(): {id:number, poligono:object}{
    return {
      id: this.get('id'),
      poligono: this.get('poligono')
    }
  }
  @Column({
    type: DataType.INTEGER({ unsigned: true }),
    primaryKey: true,
    allowNull: false
  })
  id: number;

  @Column({
    type: 'POLYGON',
    allowNull: false
  })
  poligono: object
}

