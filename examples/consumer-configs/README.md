# Consumer Configuration Examples

Comprehensive examples showing how to customize `eslint-plugin-apx-eslint` in your project.

## Table of Contents

1. [Basic .apxlintrc Examples](#basic-apxlintrc-examples)
2. [Advanced eslint.config.js Customization](#advanced-eslintconfigjs-customization)
3. [Common Use Cases](#common-use-cases)

---

## Basic .apxlintrc Examples

Use `.apxlintrc` to configure **paths** to lint. This is the simplest way to get started.

### Basic React App

**`.apxlintrc`**
```json
{
  "paths": [
    "src/**/*.{js,jsx,ts,tsx}"
  ]
}
```

### Next.js Project

**`.apxlintrc`**
```json
{
  "paths": [
    "app/**/*.{ts,tsx}",
    "pages/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "lib/**/*.{ts,tsx}"
  ]
}
```

### Monorepo

**`.apxlintrc`**
```json
{
  "paths": [
    "packages/**/src/**/*.{ts,tsx}",
    "apps/**/src/**/*.{ts,tsx}"
  ]
}
```

### Library Project

**`.apxlintrc`**
```json
{
  "paths": [
    "src/**/*.ts",
    "lib/**/*.ts",
    "index.ts"
  ]
}
```

### Full-Stack App

**`.apxlintrc`**
```json
{
  "paths": [
    "client/src/**/*.{ts,tsx}",
    "server/src/**/*.ts",
    "shared/**/*.ts"
  ]
}
```

---

## Advanced eslint.config.js Customization

Use `eslint.config.js` to customize **rules and plugins**. This gives you full control.

### 1. Override Specific Rules

**`eslint.config.js`**
```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.recommended,
        rules: {
            // Override rules
            'no-console': 'off',
            'max-len': ['error', 120],
            'indent': ['error', 2],
            '@typescript-eslint/no-explicit-any': 'error'
        }
    }
];
```

### 2. Disable Multiple Rules

**`eslint.config.js`**
```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.createConfig({
            ignoreRules: [
                'no-console',
                'no-debugger',
                '@typescript-eslint/no-explicit-any'
            ]
        })
    }
];
```

### 3. Add Additional Plugins

**`eslint.config.js`**
```javascript
const apxLinter = require('eslint-plugin-apx-eslint');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.recommended,
        plugins: {
            ...apxLinter.configs.recommended.plugins,
            prettier: prettierPlugin
        },
        rules: {
            ...apxLinter.configs.recommended.rules,
            'prettier/prettier': 'error'
        }
    }
];
```

### 4. Multiple Configurations

**`eslint.config.js`**
```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    // Strict for source
    {
        files: ['src/**/*.{ts,tsx}'],
        ignores: ['**/*.test.{ts,tsx}'],
        ...apxLinter.configs.strict
    },
    
    // Relaxed for tests
    {
        files: ['**/*.test.{ts,tsx}'],
        ...apxLinter.configs.relaxed
    },
    
    // Custom for config files
    {
        files: ['*.config.{js,ts}'],
        ...apxLinter.createConfig({
            rules: {
                'no-console': 'off'
            }
        })
    }
];
```

### 5. Company Coding Standards

**`eslint.config.js`**
```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

const companyRules = {
    'indent': ['error', 2],
    'max-len': ['error', 100],
    'no-console': 'error',
    '@typescript-eslint/no-explicit-any': 'error'
};

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.createConfig({
            rules: companyRules
        })
    }
];
```

### 6. Merge Multiple Rule Sets

**`eslint.config.js`**
```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

const teamRules = { 'max-len': ['error', 120] };
const projectRules = { 'no-console': 'off' };
const securityRules = { 'no-eval': 'error' };

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.recommended,
        rules: apxLinter.mergeRules(
            teamRules,
            projectRules,
            securityRules
        )
    }
];
```

### 7. Environment-Based Configuration

**`eslint.config.js`**
```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.createConfig({
            strict: isProd,
            rules: {
                'no-console': isDev ? 'off' : 'error',
                'no-debugger': isDev ? 'warn' : 'error'
            }
        })
    }
];
```

### 8. Custom Parser Options

**`eslint.config.js`**
```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{ts,tsx}'],
        ...apxLinter.configs.recommended,
        languageOptions: {
            ...apxLinter.configs.recommended.languageOptions,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: __dirname
            },
            globals: {
                myGlobalVar: 'readonly',
                API_URL: 'readonly'
            }
        },
        settings: {
            'import/resolver': {
                typescript: {
                    project: ['./tsconfig.json', './packages/*/tsconfig.json']
                }
            }
        }
    }
];
```

---

## Common Use Cases

### Use Case 1: "I want to allow console.log in my project"

**Option A: Using .apxlintrc + eslint.config.js**

`.apxlintrc`:
```json
{
  "paths": ["src/**/*.{ts,tsx}"]
}
```

`eslint.config.js`:
```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{ts,tsx}'],
        ...apxLinter.configs.recommended,
        rules: {
            'no-console': 'off'
        }
    }
];
```

**Option B: Using createConfig**

`eslint.config.js`:
```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{ts,tsx}'],
        ...apxLinter.createConfig({
            ignoreRules: ['no-console']
        })
    }
];
```

### Use Case 2: "I want 2-space indentation instead of 4"

`eslint.config.js`:
```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{ts,tsx}'],
        ...apxLinter.configs.recommended,
        rules: {
            'indent': ['error', 2],
            'react/jsx-indent': ['error', 2],
            'react/jsx-indent-props': ['error', 2]
        }
    }
];
```

### Use Case 3: "I want to use Prettier with this"

`eslint.config.js`:
```javascript
const apxLinter = require('eslint-plugin-apx-eslint');
const prettier = require('eslint-plugin-prettier');

module.exports = [
    {
        files: ['**/*.{ts,tsx}'],
        ...apxLinter.configs.recommended,
        plugins: {
            ...apxLinter.configs.recommended.plugins,
            prettier
        },
        rules: {
            ...apxLinter.configs.recommended.rules,
            'prettier/prettier': 'error',
            // Disable conflicting rules
            ...apxLinter.disableRules('indent', 'quotes', 'semi')
        }
    }
];
```

### Use Case 4: "I want different rules for tests"

`eslint.config.js`:
```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    // Strict for source
    {
        files: ['src/**/*.{ts,tsx}'],
        ignores: ['**/*.test.{ts,tsx}'],
        ...apxLinter.configs.strict
    },
    
    // Relaxed for tests
    {
        files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
        ...apxLinter.createConfig({
            ignoreRules: [
                'no-console',
                '@typescript-eslint/no-explicit-any',
                'max-len'
            ]
        })
    }
];
```

### Use Case 5: "I want to add my own custom rules"

`eslint.config.js`:
```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{ts,tsx}'],
        ...apxLinter.configs.recommended,
        rules: {
            ...apxLinter.configs.recommended.rules,
            
            // Your custom rules
            'my-custom-rule': 'error',
            'another-rule': ['warn', { option: true }],
            
            // Override APX rules
            'max-len': ['error', 100]
        }
    }
];
```

---

## Quick Reference

### Available Presets

- `apxLinter.configs.recommended` - Balanced (default)
- `apxLinter.configs.strict` - Stricter enforcement
- `apxLinter.configs.relaxed` - More permissive

### Utility Functions

- `apxLinter.createConfig(options)` - Create custom config
- `apxLinter.disableRules(...names)` - Disable multiple rules
- `apxLinter.overrideRuleSeverity(rules)` - Change severities
- `apxLinter.mergeRules(...configs)` - Merge configurations

### Configuration Files Priority

1. **eslint.config.js** - Rules and plugins customization
2. **.apxlintrc** or **.apxlintrc.json** - Paths configuration
3. **package.json** (`apxlint` field) - Alternative to .apxlintrc
4. Command line arguments - Override everything

---

## Tips

1. **Start Simple**: Use `.apxlintrc` for paths, add `eslint.config.js` only when you need customization
2. **Use Presets**: Start with a preset (`recommended`, `strict`, `relaxed`) then customize
3. **Test Changes**: Run `npx apx-lint` to test your configuration
4. **Document Overrides**: Comment why you override specific rules
5. **Use Environment Variables**: Make configs dynamic based on NODE_ENV

---

## Need Help?

- See [main README](../../README.md) for complete API documentation
- Check [test/configs](../../test/configs/) for more examples
- Run `npx apx-lint --help` for CLI options
