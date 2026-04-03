import db from './database/index.js';
import fs from 'fs';

const cols = await db('site_settings').columnInfo();
const rows = await db('site_settings').select('*');

let output = 'COLUMNS: ' + Object.keys(cols).join(', ') + '\n\n';
for (const row of rows) {
    output += JSON.stringify(row, null, 2) + '\n\n---\n\n';
}

fs.writeFileSync('settings_dump.txt', output);
console.log('Written to settings_dump.txt');
console.log('Row count:', rows.length);
await db.destroy();
