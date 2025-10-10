const apxLinter = require('../../index.js');

// Example: Create a config with custom rule overrides
module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.createConfig({
            rules: {
                'max-len': ['error', 120],
                'indent': ['error', 2],
                'no-console': 'off',
                '@typescript-eslint/no-explicit-any': 'error'
            }
        })
    }
];

