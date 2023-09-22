import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Paragraph, Document, Tag } from '../../entities';

export const postgresOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_DB_HOST,
  port: Number(process.env.POSTGRES_DB_PORT) || 5432,
  username: process.env.POSTGRES_DB_USER,
  password: process.env.POSTGRES_DB_PASS,
  database: process.env.POSTGRES_DB_NAME,
  entities: [Paragraph, Document, Tag],
  synchronize: true,
};
