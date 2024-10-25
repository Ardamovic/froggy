// Import the required ESLint configurations
const { next } = require('eslint-config-next');
const prettier = require('eslint-config-prettier');

module.exports = [
    // Extend the Next.js configuration
    next,

    // You can add additional rules or overrides here if needed
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        plugins: {
            // Include any specific plugins here
        },
        rules: {
            'react/no-unescaped-entities': 'off',
        },
    },

    // Include Prettier rules
    prettier,
];
