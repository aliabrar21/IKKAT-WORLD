// Fix all localhost:5000 image URLs in the Render PostgreSQL database
// Run: node fix_image_urls.mjs

import db from './database/index.js';

const OLD_BASE = 'http://localhost:5000';
const NEW_BASE = 'https://ikkat-world-api.onrender.com';

async function fixUrls() {
    console.log('Starting image URL migration...');
    console.log(`Replacing: ${OLD_BASE}  →  ${NEW_BASE}\n`);
    let fixedCount = 0;

    const products = await db('products').select('id', 'imageUrl', 'images');

    for (const product of products) {
        let needsUpdate = false;
        const updates = {};

        // Fix primary imageUrl
        if (product.imageUrl && product.imageUrl.includes('localhost')) {
            updates.imageUrl = product.imageUrl.replace(OLD_BASE, NEW_BASE);
            needsUpdate = true;
        }

        // Fix images array — Knex returns it as a real JS array from Postgres
        if (Array.isArray(product.images)) {
            const fixed = product.images.map(url =>
                url && url.includes('localhost') ? url.replace(OLD_BASE, NEW_BASE) : url
            );
            const hasChanges = fixed.some((url, i) => url !== product.images[i]);
            if (hasChanges) {
                updates.images = fixed; // Knex will serialize it back to Postgres array
                needsUpdate = true;
            }
        }

        if (needsUpdate) {
            await db('products').where('id', product.id).update(updates);
            console.log(`  ✓ Product ID ${product.id} fixed`);
            fixedCount++;
        }
    }

    // Fix site_settings
    try {
        const settings = await db('site_settings').select('*');
        const cols = Object.keys(await db('site_settings').columnInfo());
        
        for (const row of settings) {
            const updates = {};
            for (const col of cols) {
                const val = row[col];
                if (typeof val === 'string' && val.includes('localhost')) {
                    let newVal = val;
                    try {
                        const obj = JSON.parse(val);
                        let changed = false;
                        for (const k of Object.keys(obj)) {
                            if (typeof obj[k] === 'string' && obj[k].includes('localhost')) {
                                obj[k] = obj[k].replace(OLD_BASE, NEW_BASE);
                                changed = true;
                            }
                        }
                        if (changed) newVal = JSON.stringify(obj);
                    } catch {
                        newVal = val.split(OLD_BASE).join(NEW_BASE);
                    }
                    if (newVal !== val) updates[col] = newVal;
                }
            }
            if (Object.keys(updates).length > 0) {
                await db('site_settings').where('id', row.id).update(updates);
                console.log(`  ✓ site_settings row ID ${row.id} fixed`);
                fixedCount++;
            }
        }
    } catch (e) {
        console.log('  (site_settings: skipped or empty —', e.message, ')');
    }

    console.log(`\n✅ Done! Fixed ${fixedCount} records.`);
    await db.destroy();
}

fixUrls().catch(err => {
    console.error('❌ Failed:', err.message);
    process.exit(1);
});
