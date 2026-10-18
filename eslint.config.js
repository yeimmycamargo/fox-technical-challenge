import js from '@eslint/js';
import globals from 'globals';
export default [
  { ignores: ['node_modules/**', 'allure-results/**', 'allure-report/**', 'evidence/**', '.runtime/**'] },
  js.configs.recommended,
  { languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: globals.node },
    rules: { 'no-unused-vars': 'error', 'eqeqeq': 'error', 'no-var': 'error', 'prefer-const': 'error', 'no-duplicate-imports': 'error', 'no-unneeded-ternary': 'error' } },
  { files: ['test/specs/**/*.js'], languageOptions: { globals: globals.mocha } },
];
