/**
 * Example: Disable multiple rules easily
 */
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        // Use createConfig with ignoreRules
        ...apxLinter.createConfig({
            ignoreRules: [
                'no-console',
                'no-debugger',
                '@typescript-eslint/no-explicit-any',
                'react/jsx-key'
            ]
        })
    }
];

