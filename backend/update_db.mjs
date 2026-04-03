import db from './database/index.js';

async function updateDB() {
    try {
        await db.raw(`UPDATE categories SET name = REPLACE(name, 'Ikat', 'Ikkat')`);
        await db.raw(`UPDATE products SET name = REPLACE(name, 'Ikat', 'Ikkat')`);
        console.log('Database updated successfully.');
    } catch (error) {
        console.error('Error updating DB:', error);
    } finally {
        process.exit(0);
    }
}

updateDB();
