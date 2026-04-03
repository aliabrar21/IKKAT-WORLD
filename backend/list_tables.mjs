import db from './database/index.js';
const tables = await db.raw("SELECT tablename FROM pg_tables WHERE schemaname='public'");
console.log(tables.rows.map(r => r.tablename));
await db.destroy();
