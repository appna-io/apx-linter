const apxLinter = require('../../index.js');

// Example: Create a config with specific rules ignored
module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.createConfig({
            ignoreRules: [
                'no-console',
                '@typescript-eslint/no-unused-vars',
                '@typescript-eslint/no-explicit-any'
            ]
        })
    }
];

