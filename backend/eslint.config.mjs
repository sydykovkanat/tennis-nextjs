import globals from 'globals';
import pluginJs from '@eslint/js';
import { ESLint } from 'eslint';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

const eslint = new ESLint({
  overrideConfig: {
    languageOptions: {
      globals: globals.node,
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
    },
  },
});

export default eslint;
