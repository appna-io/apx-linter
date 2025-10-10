/**
 * Example: Basic customization - Override specific rules
 */
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.recommended,
        rules: {
            // Override existing rules
            'no-console': 'off',                                    // Allow console.log
            'max-len': ['error', 120],                             // Change max line length
            '@typescript-eslint/no-explicit-any': 'error',         // Stricter on 'any'
            'indent': ['error', 2],                                // Use 2 spaces instead of 4
            
            // Customize React rules
            'react/jsx-indent': ['error', 2],
            'react/jsx-indent-props': ['error', 2]
        }
    }
];

