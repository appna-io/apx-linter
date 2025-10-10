/**
 * Example: Environment-based configuration
 */
const apxLinter = require('eslint-plugin-apx-eslint');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
const isCI = process.env.CI === 'true';

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.createConfig({
            // Use strict mode in production/CI
            strict: isProd || isCI,
            
            rules: {
                // Allow console in development
                'no-console': isDev ? 'off' : 'error',
                
                // Allow debugger in development
                'no-debugger': isDev ? 'warn' : 'error',
                
                // Stricter type checking in CI
                '@typescript-eslint/no-explicit-any': isCI ? 'error' : 'warn',
                
                // Performance rules in production
                'react/jsx-no-bind': isProd ? 'warn' : 'off'
            }
        })
    }
];

