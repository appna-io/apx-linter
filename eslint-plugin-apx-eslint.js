const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const importPlugin = require('eslint-plugin-import');

// Base rules that apply to all configurations
const baseRules = {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    // 'no-tabs': 'error',
    // 'no-mixed-spaces-and-tabs': 'error',
    'import/order': 'off',
    'import/no-unresolved': 'error',
    'import/extensions': [
        'error',
        'ignorePackages',
        {
            'js': 'never',
            'jsx': 'never',
            'ts': 'never',
            'tsx': 'never'
        }
    ],
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'react/require-default-props': 'off',
    'react/jsx-indent-props': ['error', 4],
    'react/function-component-definition': 'off',
    'react/jsx-indent': ['error', 4],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-filename-extension': [
        1,
        {
            'extensions': ['.tsx', '.ts']
        }
    ],
    'import/no-cycle': 'warn',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-undef': 'error',
    'quotes': ['error', 'single'],
    'no-duplicate-imports': 'error',
    'comma-spacing': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'semi': [2, 'always'],
    'react/jsx-key': 'off',
    'linebreak-style': 0,
    'object-curly-spacing': ['error', 'always'],
    'arrow-body-style': 0,
    'indent': [
        2,
        4,
        {
            'SwitchCase': 1
        }
    ],
    'no-trailing-spaces': 0,
    'import/imports-first': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
        'warn',
        {
            'argsIgnorePattern': '^_'
        }
    ],
    'space-before-function-paren': 0,
    'func-names': 0,
    'new-cap': 0,
    'max-len': [2, 260],
    'no-param-reassign': [
        2,
        {
            'props': false
        }
    ],
    'no-restricted-syntax': [
        1,
        'ForInStatement',
        'LabeledStatement',
        'WithStatement'
    ],
    'class-methods-use-this': 0,
    'comma-dangle': ['error', 'never'],
    'no-underscore-dangle': 0,
    'prefer-destructuring': 0,
    'import/no-named-as-default': 0,
    '@typescript-eslint/ban-types': 'off',
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-empty-object-type': 'off',
    'object-curly-newline': [
        'error',
        {
            'ObjectExpression': {
                'multiline': true,
                'consistent': true
            },
            'ObjectPattern': {
                'multiline': true,
                'consistent': true
            }
        }
    ],
    'space-infix-ops': [
        'error',
        {
            'int32Hint': false
        }
    ],
    'import/newline-after-import': [
        'error',
        {
            'count': 1
        }
    ],
    'no-multi-spaces': ['error'],
    'key-spacing': [
        'error',
        {
            'beforeColon': false,
            'afterColon': true
        }
    ],
    'prefer-const': [
        'error',
        {
            'destructuring': 'all',
            'ignoreReadBeforeAssign': true
        }
    ]
};

// Strict rules for stricter enforcement
const strictRules = {
    '@typescript-eslint/no-explicit-any': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    '@typescript-eslint/no-unused-vars': [
        'error',
        {
            'argsIgnorePattern': '^_'
        }
    ],
    'import/no-cycle': 'error'
};

/**
 * Creates a flat config for TypeScript + React projects
 * @param {Object} options - Configuration options
 * @param {Object} options.rules - Custom rules to merge/override
 * @param {string[]} options.ignoreRules - Rule names to disable
 * @param {boolean} options.strict - Use strict mode
 * @returns {Object} ESLint flat config
 */
function createConfig(options = {}) {
    const { rules: customRules = {}, ignoreRules = [], strict = false } = options;

    let finalRules = { ...baseRules };

    // Apply strict rules if enabled
    if (strict) {
        finalRules = { ...finalRules, ...strictRules };
    }

    // Disable ignored rules
    ignoreRules.forEach(ruleName => {
        finalRules[ruleName] = 'off';
    });

    // Merge custom rules (override existing)
    Object.assign(finalRules, customRules);

    return {
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true
                }
            },
            globals: {
                // Browser globals
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                console: 'readonly',
                localStorage: 'readonly',
                sessionStorage: 'readonly',
                fetch: 'readonly',
                // DOM types
                HTMLElement: 'readonly',
                HTMLDivElement: 'readonly',
                HTMLInputElement: 'readonly',
                HTMLButtonElement: 'readonly',
                HTMLFormElement: 'readonly',
                HTMLSpanElement: 'readonly',
                HTMLAnchorElement: 'readonly',
                HTMLImageElement: 'readonly',
                Element: 'readonly',
                Node: 'readonly',
                NodeList: 'readonly',
                Event: 'readonly',
                MouseEvent: 'readonly',
                KeyboardEvent: 'readonly',
                // Node globals
                process: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'readonly',
                global: 'readonly',
                Buffer: 'readonly'
            }
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            'react': reactPlugin,
            'react-hooks': reactHooksPlugin,
            'jsx-a11y': jsxA11yPlugin,
            'import': importPlugin
        },
        rules: finalRules,
        settings: {
            react: {
                version: 'detect'
            },
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json'
                },
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx']
                }
            }
        }
    };
}

/**
 * Helper to disable specific rules
 * @param {string[]} ruleNames - Array of rule names to disable
 * @returns {Object} Rules object with all specified rules set to 'off'
 */
function disableRules(...ruleNames) {
    return ruleNames.reduce((acc, rule) => {
        acc[rule] = 'off';
        return acc;
    }, {});
}

/**
 * Helper to override rule severity
 * @param {Object} rules - Rules object where key is rule name, value is new severity
 * @returns {Object} Rules object with updated severities
 */
function overrideRuleSeverity(rules) {
    return Object.entries(rules).reduce((acc, [rule, severity]) => {
        acc[rule] = severity;
        return acc;
    }, {});
}

/**
 * Helper to merge multiple rule configurations
 * @param {...Object} ruleConfigs - Multiple rule configuration objects
 * @returns {Object} Merged rules object (later configs override earlier ones)
 */
function mergeRules(...ruleConfigs) {
    return Object.assign({}, ...ruleConfigs);
}

// Recommended configuration (default)
const recommended = createConfig();

// Strict configuration
const strict = createConfig({ strict: true });

// Relaxed configuration (warnings instead of errors)
const relaxed = createConfig({
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'off',
        'import/no-cycle': 'off'
    }
});

// Legacy export for backwards compatibility
module.exports = {
    configs: {
        recommended,
        strict,
        relaxed
    },
    // Utility functions
    createConfig,
    disableRules,
    overrideRuleSeverity,
    mergeRules,
    // Export base rules for customization
    rules: baseRules,
    strictRules
};
