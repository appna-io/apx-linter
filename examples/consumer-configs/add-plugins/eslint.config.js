/**
 * Example: Add additional ESLint plugins
 */
const apxLinter = require('eslint-plugin-apx-eslint');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.recommended,
        
        // Add more plugins
        plugins: {
            ...apxLinter.configs.recommended.plugins,
            prettier: prettierPlugin
        },
        
        // Add plugin rules
        rules: {
            ...apxLinter.configs.recommended.rules,
            'prettier/prettier': 'error'
        }
    }
];

