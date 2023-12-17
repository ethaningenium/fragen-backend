import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { DB_KEY } from '../libs/env';
import * as schema from './schema';

neonConfig.fetchConnectionCache = true;
export const sql = neon(DB_KEY);
export const db = drizzle(sql, { schema });
