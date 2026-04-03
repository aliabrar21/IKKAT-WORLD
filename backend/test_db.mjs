import db from './database/index.js';

async function test() {
    try {
        const result = await db.raw('SELECT 1');
        console.log('Success:', result.rows);
    } catch (err) {
        console.error('ERROR CONNECTION:');
        console.error(err);
    } finally {
        process.exit(0);
    }
}

test();
