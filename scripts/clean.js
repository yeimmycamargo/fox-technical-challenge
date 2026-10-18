import { rmSync } from 'node:fs';
for (const path of ['allure-results', 'allure-report', 'evidence']) rmSync(path, { recursive: true, force: true });
