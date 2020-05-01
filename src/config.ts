import { dialect } from "./constants";
import { SequelizeOptions } from 'sequelize-typescript';

export const PORT: number = parseInt(process.env.PORT);
export const DOC_PATH = process.env.DOC_PATH || 'api';
export const JWT_SECRET = process.env.JWT_SECRET || 'SECRET';
export const ENV = process.env.ENVIRONMENT || 'dev';
export const databaseConfig: SequelizeOptions = ENV === 'prod'? {
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  timezone: process.env.DATABASE_TIMEZONE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  dialect,
  benchmark: true,
  pool: {
    acquire: parseInt(process.env.DATABASE_ACQUIRE_TIME),
    max: parseInt(process.env.DATABASE_MAX_CONNECTION),
    min: parseInt(process.env.DATABASE_MIN_CONNECTION),
    idle: parseInt(process.env.DATABASE_IDLE_TIME),
    evict: parseInt(process.env.DATABASE_EVICT_TIME)
  }
} : {
  dialect: "sqlite",
  storage: ":memory:"
};
export const CERT_FOLDER = process.env.CERT_FOLDER;
export const PROTOCOL = process.env.PROTOCOL || "HTTP";