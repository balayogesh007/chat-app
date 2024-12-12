import { DataSource } from 'typeorm';
import dbConfiguration from './db.config';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  isGlobal: true,
});

const datasource = async () => {
  const getDbConfig = await dbConfiguration();

  delete getDbConfig.cli;
  delete getDbConfig.autoLoadEntities;
  delete getDbConfig.pool;
  return new DataSource(getDbConfig);
};

export default datasource();
