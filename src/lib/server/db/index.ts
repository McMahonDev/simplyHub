import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
if (!import.meta.env.VITE_DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = postgres(import.meta.env.VITE_DATABASE_URL);
export const db = drizzle(client);
