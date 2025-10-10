/**
 * Example: Customize parser options and language settings
 */
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.recommended,
        
        // Customize language options
        languageOptions: {
            ...apxLinter.configs.recommended.languageOptions,
            parserOptions: {
                ...apxLinter.configs.recommended.languageOptions.parserOptions,
                project: './tsconfig.json',                    // Specify tsconfig
                tsconfigRootDir: __dirname,
                ecmaFeatures: {
                    jsx: true
                }
            },
            globals: {
                ...apxLinter.configs.recommended.languageOptions.globals,
                // Add custom globals
                myGlobalVar: 'readonly',
                API_URL: 'readonly'
            }
        },
        
        // Customize settings
        settings: {
            ...apxLinter.configs.recommended.settings,
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: ['./tsconfig.json', './packages/*/tsconfig.json']
                }
            }
        }
    }
];

