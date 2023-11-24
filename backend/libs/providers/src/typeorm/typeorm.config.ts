import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService, registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';

dotenvConfig({ path: join(process.cwd(), '.env') });
const configService = new ConfigService();

const options = (): DataSourceOptions => {
  const url = configService.get('DATABASE_URL');
  if (!url) {
    throw new Error('Database URL is empty');
  }

  return {
    url,
    type: 'postgres',
    schema: 'public',
    logging: configService.get('IS_PROD') === 'false',
    entities: [
      join(process.cwd(), 'dist', 'modules', '**', '*.entity.{ts,js}'),
    ],
    migrations: [
      join(process.cwd(), 'dist', 'migrations', '**', '*migration.js'),
    ],
    migrationsRun: true,
    migrationsTableName: 'migrations',
  };
};

export default registerAs('typeorm', () => options());
export const connectionSource = new DataSource(options());
