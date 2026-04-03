import db from './database/index.js';

const OLD_BASE = 'http://localhost:5000';
const NEW_BASE = 'https://ikkat-world-api.onrender.com';

try {
    // Check what images field actually looks like
    const sample = await db('products').select('id', 'imageUrl', 'images').limit(2);
    for (const p of sample) {
        console.log('ID:', p.id);
        console.log('imageUrl:', p.imageUrl);
        console.log('images type:', typeof p.images);
        console.log('images value:', p.images);
        console.log('---');
    }
    await db.destroy();
} catch (e) {
    console.error('ERROR:', e.message);
    process.exit(1);
}
