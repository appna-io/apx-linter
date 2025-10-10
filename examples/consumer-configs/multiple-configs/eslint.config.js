/**
 * Example: Different configs for different file types
 */
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    // Strict for source files
    {
        files: ['src/**/*.{ts,tsx}'],
        ignores: ['**/*.test.{ts,tsx}'],
        ...apxLinter.configs.strict
    },
    
    // Relaxed for test files
    {
        files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
        ...apxLinter.configs.relaxed,
        rules: {
            // Additional test-specific rules
            '@typescript-eslint/no-explicit-any': 'off',
            'no-console': 'off'
        }
    },
    
    // Custom for config files
    {
        files: ['*.config.{js,ts}', '*.setup.{js,ts}'],
        ...apxLinter.createConfig({
            rules: {
                'no-console': 'off',
                '@typescript-eslint/no-var-requires': 'off'
            }
        })
    }
];

