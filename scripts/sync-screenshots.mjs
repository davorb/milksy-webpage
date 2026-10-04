import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const sources = args.filter(arg => arg !== '--dry-run');
if (sources.length > 1 || sources.some(arg => arg.startsWith('--'))) {
 throw new Error('Usage: npm run sync:screenshots -- [source-directory] [--dry-run]');
}
const source = sources.length ? path.resolve(sources[0]) : path.resolve(root, '../Milksy/AppStoreScreenshots/source');
const screens = ['today', 'timeline', 'trends'];
const englishScreens = [...screens, 'breast', 'bottle', 'diapers'];
const locales = (await fs.readdir(path.join(root, 'src/data/locales')))
 .filter(file => file.endsWith('.json') && file !== 'en.json')
 .map(file => file.replace(/\.json$/, '')).sort();
const missing = [], plan = [];

async function prepare(locale, names, directory, target) {
 for (const screen of names) {
  const from = path.join(directory, `${screen}.png`);
  const to = path.join(target, `${screen}.png`);
  const bytes = await fs.readFile(from);
  const metadata = await sharp(bytes).metadata();
  if (metadata.format !== 'png' || !metadata.width || !metadata.height) {
   throw new Error(`Not a valid PNG capture: ${from}`);
  }
  let existing;
  try { existing = await fs.readFile(to); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  plan.push({ locale, screen, to, bytes, changed: !existing?.equals(bytes) });
 }
}

// Validate every set before writing any assets. English is always required.
await prepare('en', englishScreens, path.join(source, 'iphone'), path.join(root, 'src/assets'));
for (const locale of locales) {
 const directory = path.join(source, locale, 'iphone');
 try { await fs.access(directory); }
 catch (error) {
  if (error.code !== 'ENOENT') throw error;
  missing.push(locale);
  continue;
 }
 await prepare(locale, screens, directory, path.join(root, 'src/assets/screenshots', locale));
}
const changed = plan.filter(item => item.changed);
console.log(`Source: ${source}`);
for (const item of changed) {
 console.log(`${dryRun ? 'Would update' : 'Updating'} ${item.locale}/${item.screen}.png`);
 if (!dryRun) {
  await fs.mkdir(path.dirname(item.to), { recursive: true });
  await fs.writeFile(item.to, item.bytes);
 }
}
console.log(`${dryRun ? 'Would update' : 'Updated'} ${changed.length} captures; ${plan.length - changed.length} already identical.`);
if (missing.length) console.log(`No captures for ${missing.join(', ')}; existing assets and language mappings retained.`);
