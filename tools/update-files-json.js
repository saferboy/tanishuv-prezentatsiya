// dist/_files.json ni qayta yasaydi — slaydlarni qo'lda tahrirlagandan keyin ishlating.
// Ishlatish:  node tools/update-files-json.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..', 'dist');
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
};
const skip = new Set(['_files.json', 'netlify.toml', '_headers']);
const files = {};

(function walk(dir, rel) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const r = rel ? rel + '/' + entry.name : entry.name;
    if (skip.has(r) || r.startsWith('_blob')) continue;
    if (entry.isDirectory()) {
      walk(path.join(dir, entry.name), r);
    } else {
      const bytes = fs.readFileSync(path.join(dir, entry.name));
      files[r] = {
        sha256: crypto.createHash('sha256').update(bytes).digest('hex'),
        size: bytes.length,
        contentType: types[path.extname(r)] || 'application/octet-stream',
      };
    }
  }
})(root, '');

fs.writeFileSync(
  path.join(root, '_files.json'),
  JSON.stringify({ ver: 'static-' + Date.now(), files })
);
console.log(Object.keys(files).length + ' ta fayl yozildi');
