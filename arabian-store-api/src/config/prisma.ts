import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

import { parse } from 'pg-connection-string';

const config = parse(process.env.DATABASE_URL || '');
const pool = new Pool({
  ...config,
  password: String(config.password || ''),
} as any);
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });
