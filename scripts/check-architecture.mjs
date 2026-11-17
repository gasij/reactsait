import fs from 'node:fs';
import path from 'node:path';
const src = path.resolve('src');
const layers = ['_app', '_pages', 'widgets', 'features', 'entities', 'shared'];
const errors = [];
function files(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(path.join(dir, entry.name)) : [path.join(dir, entry.name)]); }
function resolveFile(target) { return [target, `${target}.js`, `${target}.jsx`, path.join(target, 'index.js'), path.join(target, 'index.jsx')].find(file => fs.existsSync(file) && fs.statSync(file).isFile()); }
for (const file of files(src).filter(file => /\.[jt]sx?$/.test(file) && !/\.test\./.test(file))) {
  const from = path.relative(src, file).split(path.sep);
  const rank = layers.indexOf(from[0]);
  if (rank < 0) { errors.push(`Outside FSD: ${file}`); continue; }
  const code = fs.readFileSync(file, 'utf8');
  const imports = [...code.matchAll(/(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s*)['"]([^'"]+)['"]/g)].map(match => match[1]);
  for (const specifier of imports) {
    if (!specifier.startsWith('@/') && !specifier.startsWith('.')) continue;
    const target = resolveFile(specifier.startsWith('@/') ? path.join(src, specifier.slice(2)) : path.resolve(path.dirname(file), specifier));
    if (!target) { errors.push(`Unresolved ${specifier} in ${path.relative(src, file)}`); continue; }
    if (!/\.[jt]sx?$/.test(target)) continue;
    const to = path.relative(src, target).split(path.sep);
    const targetRank = layers.indexOf(to[0]);
    const ownSlice = from[0] === to[0] && (['_app', 'shared'].includes(from[0]) || from[1] === to[1]);
    if (targetRank < rank || targetRank === rank && !ownSlice) errors.push(`Forbidden layer/slice import: ${from.join('/')} -> ${to.join('/')}`);
    if (!ownSlice && !['_app', 'shared'].includes(to[0]) && !/^index\.[jt]sx?$/.test(path.basename(target))) errors.push(`Use slice public API: ${from.join('/')} -> ${specifier}`);
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log('FSD boundaries and public APIs: OK');
