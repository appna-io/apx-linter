/**
 * Example: Merge multiple rule configurations
 */
const apxLinter = require('eslint-plugin-apx-eslint');

// Team-wide rules
const teamRules = {
    'max-len': ['error', 120],
    'indent': ['error', 2]
};

// Project-specific rules
const projectRules = {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/no-explicit-any': 'warn'
};

// Security rules
const securityRules = {
    'no-eval': 'error',
    'no-implied-eval': 'error'
};

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.recommended,
        rules: apxLinter.mergeRules(
            apxLinter.rules,          // Base rules
            teamRules,                // Team standards
            projectRules,             // Project-specific
            securityRules             // Security requirements
        )
    }
];

