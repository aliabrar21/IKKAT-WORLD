// Fix all localhost:5000 image URLs in the Render PostgreSQL database
// Run: node fix_image_urls.mjs

import db from './database/index.js';

const OLD_BASE = 'http://localhost:5000';
const NEW_BASE = 'https://ikkat-world-api.onrender.com';

async function fixUrls() {
    console.log('Starting image URL migration...');
    console.log(`Replacing: ${OLD_BASE}  →  ${NEW_BASE}\n`);
    let fixedCount = 0;

    // 1. Fix products table
    const products = await db('products').select('id', 'imageUrl', 'images');

    for (const product of products) {
        let needsUpdate = false;
        const updates = {};

        if (product.imageUrl && product.imageUrl.includes('localhost')) {
            updates.imageUrl = product.imageUrl.replace(OLD_BASE, NEW_BASE);
            needsUpdate = true;
        }

        if (Array.isArray(product.images)) {
            const fixed = product.images.map(url =>
                url && url.includes('localhost') ? url.replace(OLD_BASE, NEW_BASE) : url
            );
            const hasChanges = fixed.some((url, i) => url !== product.images[i]);
            if (hasChanges) {
                updates.images = fixed;
                needsUpdate = true;
            }
        }

        if (needsUpdate) {
            await db('products').where('id', product.id).update(updates);
            console.log(`  ✓ Product ID ${product.id} fixed`);
            fixedCount++;
        }
    }

    // 2. Fix site_settings table
    const settings = await db('site_settings').select('*');
    for (const row of settings) {
        let val = row.value;
        let needsUpdate = false;

        // Recursive function to replace URLs in deep objects/arrays
        const replaceInObj = (obj) => {
            let changed = false;
            if (typeof obj === 'string') {
                if (obj.includes('localhost')) {
                    return { val: obj.replace(new RegExp(OLD_BASE, 'g'), NEW_BASE), changed: true };
                }
                return { val: obj, changed: false };
            } else if (Array.isArray(obj)) {
                const newArr = obj.map(item => {
                    const res = replaceInObj(item);
                    if (res.changed) changed = true;
                    return res.val;
                });
                return { val: newArr, changed };
            } else if (obj !== null && typeof obj === 'object') {
                const newObj = {};
                for (const k in obj) {
                    const res = replaceInObj(obj[k]);
                    if (res.changed) changed = true;
                    newObj[k] = res.val;
                }
                return { val: newObj, changed };
            }
            return { val: obj, changed: false };
        };

        const result = replaceInObj(val);
        if (result.changed) {
            await db('site_settings').where('id', row.id).update({ value: result.val });
            console.log(`  ✓ site_settings row ID ${row.id} (${row.key}) fixed`);
            fixedCount++;
        }
    }

    console.log(`\n✅ Done! Fixed ${fixedCount} records total.`);
    await db.destroy();
}

fixUrls().catch(err => {
    console.error('❌ Failed:', err.message);
    process.exit(1);
});
