/**
 * Advanced ESLint configuration example
 * Shows how to use different configs for different file types
 * and how to customize rules
 */

const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    // Strict mode for source files
    {
        files: ['src/**/*.{ts,tsx}'],
        ignores: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
        ...apxLinter.configs.strict
    },
    
    // Relaxed mode for test files
    {
        files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
        ...apxLinter.configs.relaxed
    },
    
    // Custom config for scripts (allow console)
    {
        files: ['scripts/**/*.{js,ts}'],
        ...apxLinter.createConfig({
            rules: {
                'no-console': 'off',
                '@typescript-eslint/no-var-requires': 'off'
            }
        })
    },
    
    // Config files
    {
        files: ['*.config.{js,ts}'],
        ...apxLinter.createConfig({
            ignoreRules: ['@typescript-eslint/no-var-requires']
        })
    }
];

