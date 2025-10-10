/**
 * Example ESLint configuration using apx-eslint plugin
 * This is a basic setup for a TypeScript + React project
 */

const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.recommended
    }
];

