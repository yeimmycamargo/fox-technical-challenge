import { readFileSync } from 'node:fs';
/** Load scenario data relative to this module, regardless of the terminal directory. */
export function loadData(name) {
  return JSON.parse(readFileSync(new URL(`../data/${name}.json`, import.meta.url), 'utf8'));
}
