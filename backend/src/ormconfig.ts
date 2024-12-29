import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'med_scheduler',
  password: 'dsbsn2024',
  database: 'medical_scheduler',
};
export default config;
