import fs from 'node:fs';
import path from 'node:path';

// Copy the real app captures; composition artwork is for the App Store campaign.
const source = path.resolve(process.argv[2] || '../Milksy/AppStoreScreenshots/source');
const screens = ['today', 'timeline', 'trends'];
const locales = fs.readdirSync('src/data/locales').filter(file => file.endsWith('.json') && file !== 'en.json').map(file => file.replace(/\.json$/, ''));
const available = [], missing = [];
// Validate every available set before changing any website assets.
for (const locale of locales) {
 const directory = path.join(source, locale, 'iphone');
 if (!fs.existsSync(directory)) { missing.push(locale); continue; }
 for (const screen of screens) {
  const file = path.join(directory, `${screen}.png`);
  if (!fs.existsSync(file)) throw new Error(`Incomplete ${locale} screenshot set: ${file}`);
  const bytes = fs.readFileSync(file);
  if (!bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) throw new Error(`Not a PNG capture: ${file}`);
 }
 available.push(locale);
}
if (!available.length) throw new Error(`No localized screenshot sets found in ${source}`);
for (const locale of available) {
 const target = path.join('src/assets/screenshots', locale);
 fs.mkdirSync(target, { recursive: true });
 for (const screen of screens) fs.copyFileSync(path.join(source, locale, 'iphone', `${screen}.png`), path.join(target, `${screen}.png`));
}
console.log(`Imported ${available.length * screens.length} unchanged captures for ${available.join(', ')}.`);
if (missing.length) console.log(`No captures found for ${missing.join(', ')}. These pages retain their documented screenshot fallback.`);
console.log('When adding a newly captured language, update screenshotLocales in src/data/localization.ts and remove its fallback caption.');
