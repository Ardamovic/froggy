import nextPlugin from '@next/eslint-plugin-next';
import prettier from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    ignores: ['froggy/.next/**/*'], // Ignore Next.js build output
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      next: nextPlugin,
      prettier: prettier,
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './froggy/tsconfig.json',
        tsconfigRootDir: '.',
      },
    },
    settings: {
      next: {
        rootDir: 'froggy',
      },
    },
    rules: {
      'prettier/prettier': 'error',
      // Disable the pages directory rule since you're using app router
      'next/no-html-link-for-pages': 'off',
      'next/no-img-element': 'error',
      // Add TypeScript specific rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
    },
  }
];