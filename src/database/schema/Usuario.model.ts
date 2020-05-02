import { Column, DataType, Model, Table } from 'sequelize-typescript';

type Sexo = null | 'M' | 'F';

@Table({
  tableName: 'usuario',
  underscored: true,
  timestamps: true,
  paranoid: true
})
export class Usuario extends Model<Usuario> {
  static readonly notBinarySexError: Error = new Error("El campo sexo solo puede tomar valor M o F.");
  static readonly notYoungerThanNowError: Error = new Error("La fecha de nacimiento no puede ser mayor que ahora.");

  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      isAlpha: true
    }
  })
  nombres: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      isAlpha: true
    }
  })
  apellidos: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
    validate: {
      isLaterThanNow(value) {
        const now = new Date(Date.now());
        // Todo: validar edad minima
        if (value >= now) {
          throw Usuario.notYoungerThanNowError;
        }
      }
    }
  })
  fechaNacimiento: Date;

  @Column({
    type: DataType.STRING({ length: 1 }),
    allowNull: true,
    validate: {
      isSexoValido(value) {
        if (value !== null) {
          value = value.toUpperCase();
          if (value !== 'M' && value !== 'F') {
            throw Usuario.notBinarySexError;
          }
        }
        return true;
      }
    }
  })
  sexo: Sexo;

  @Column({
    type: DataType.BLOB({ length: 'medium' }),
    allowNull: true
  })
  fotoPerfil: Buffer

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      len: [9, 9]
    }
  })
  numeroTelefonico: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      len: [8, 8]
    }
  })
  dni: string;
}

