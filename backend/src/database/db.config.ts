import { registerAs } from '@nestjs/config';
import { join } from 'path';
import { DbCredential } from './db-credential';
import { Logger } from '@nestjs/common';

export default registerAs('typeOrmConfig', async () => {
  const data = DbCredential();
  Logger.log(`Database Values -> ${JSON.stringify(data)}`);
  return {
    type: 'postgres' as const,
    host: data.DB_HOST,
    port: parseInt(data.DB_PORT),
    username: data.DB_USERNAME,
    password: data.DB_PASSWORD,
    database: data.DB_NAME,
    autoLoadEntities: true,
    entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '/migrations/*{.ts,.js}')],
    migrationsTableName: 'typeorm_migrations',
    subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
    cli: {
      migrationsDir: __dirname + '/migrations',
    },
    synchronize: process.env.DB_SYNC === 'true',
    logging: true,
    pool: {
      max: 25,
      min: 1,
      maxWaitingClients: 10,
      idleTimeoutMillis: 300000,
    },
  };
});
