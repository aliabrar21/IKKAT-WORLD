const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (/\.(jsx|js|html|css)$/.test(fullPath)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content
                .replace(/\bIkat\b/g, 'Ikkat')
                .replace(/\bikat\b/g, 'ikkat')
                .replace(/\bIKAT\b/g, 'IKKAT');
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log('Updated ' + fullPath);
            }
        }
    }
}

replaceInDir('c:/Users/Abrar Ali/OneDrive/Desktop/Pochmapally_IKKAT_WORLD/frontend/src');
replaceInDir('c:/Users/Abrar Ali/OneDrive/Desktop/Pochmapally_IKKAT_WORLD/admin/src');
replaceInDir('c:/Users/Abrar Ali/OneDrive/Desktop/Pochmapally_IKKAT_WORLD/backend/seeds');
replaceInDir('c:/Users/Abrar Ali/OneDrive/Desktop/Pochmapally_IKKAT_WORLD/backend/migrations');
console.log('File text replacement complete.');
