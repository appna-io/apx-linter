/**
 * Example: Company/Team coding standards
 */
const apxLinter = require('eslint-plugin-apx-eslint');

// Your company's coding standards
const companyRules = {
    // Code style
    'indent': ['error', 2],
    'max-len': ['error', 100],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    
    // Best practices
    'no-console': 'error',
    'no-debugger': 'error',
    'prefer-const': 'error',
    
    // TypeScript
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    
    // React
    'react/jsx-key': 'error',
    'react/prop-types': 'off'
};

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.createConfig({
            rules: companyRules
        })
    }
];

