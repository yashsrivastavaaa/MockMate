import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { feedbackSchema } from './feedbackSchema';


const dbApi = process.env.NEXT_PUBLIC_DB_API!;
if (!dbApi) {
    throw new Error('DB_API environment variable is not set');
}
const sql = neon(dbApi);
export const db = drizzle(sql, { schema: { feedbackSchema } });

