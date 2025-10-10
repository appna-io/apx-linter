# eslint-plugin-apx-eslint

A comprehensive ESLint configuration plugin for AppNaX projects with TypeScript and React support. This plugin provides a centralized, flexible linting setup with easy customization options.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [CLI Tool](#cli-tool)
- [Advanced Customization](#advanced-customization)
- [Utility Functions](#utility-functions)
- [Available Configs](#available-configs)
- [Rule Highlights](#rule-highlights)
- [Usage Examples](#usage-examples)
  - [Basic Examples](#basic-examples)
  - [Advanced Scenarios](#advanced-scenarios)
  - [Real-World Projects](#real-world-projects)
- [Migration Guide](#migration-guide)
- [Troubleshooting](#troubleshooting)
- [Testing](#testing)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- 🎯 **Pre-configured for TypeScript + React** - Works out of the box
- 🔧 **Flexible Customization** - Easy to override or disable rules
- 📦 **Multiple Presets** - Recommended, Strict, and Relaxed configurations
- 🛠️ **Utility Functions** - Helper functions for advanced customization
- 🚀 **ESLint 9 Compatible** - Uses flat config format
- 📦 **All-in-One Package** - Includes ESLint and all required plugins
- ⚡ **CLI Tool** - Convenient `apx-lint` command for quick linting

## Installation

```bash
npm install --save-dev eslint-plugin-apx-eslint
```

That's it! This package includes ESLint and all required plugins as dependencies, so you don't need to install anything else.

## Quick Start

Create an `eslint.config.js` (or `eslint.config.mjs`) file in your project root:

### Basic Usage (Recommended Config)

```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.recommended
    }
];
```

### Using Strict Mode

```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.strict
    }
];
```

### Using Relaxed Mode

```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.relaxed
    }
];
```

---

## CLI Tool

This package includes a convenient CLI tool `apx-lint` for running ESLint with minimal setup. Features beautiful colored output powered by Chalk.

### Basic Usage

After installing the package, you can use the CLI directly:

```bash
# Lint your project (default: src/**/*.{js,jsx,ts,tsx})
npx apx-lint

# Lint and auto-fix issues
npx apx-lint --fix

# Lint specific directory
npx apx-lint src/

# Lint with custom pattern
npx apx-lint "lib/**/*.{ts,tsx}"

# Lint and fix with custom pattern
npx apx-lint --fix "src/**/*.{ts,tsx}"
```

### Add to package.json Scripts

```json
{
  "scripts": {
    "lint": "apx-lint",
    "lint:fix": "apx-lint --fix"
  }
}
```

Then run:
```bash
npm run lint
npm run lint:fix
```

### Customize Default Paths

Create a `.apxlintrc.json` file in your project root:

```json
{
  "paths": [
    "src/**/*.{js,jsx,ts,tsx}",
    "lib/**/*.{js,jsx,ts,tsx}",
    "components/**/*.{ts,tsx}"
  ]
}
```

Or add to your `package.json`:

```json
{
  "apxlint": {
    "paths": ["src/**/*.{ts,tsx}", "app/**/*.{ts,tsx}"]
  }
}
```

### CLI Options

```
Usage: apx-lint [options] [path]

Options:
  --fix          Auto-fix linting errors
  --help, -h     Show help message
  --version, -v  Show version number

Examples:
  apx-lint                              # Lint default paths
  apx-lint --fix                        # Lint and auto-fix default paths
  apx-lint src/                         # Lint specific directory
  apx-lint --fix "src/**/*.{ts,tsx}"    # Lint and fix with custom pattern
```

### Configuration Priority

The CLI looks for paths in this order:
1. Command-line argument (if provided)
2. `.apxlintrc.json` in project root
3. `.apxlintrc` in project root
4. `apxlint` field in `package.json`
5. Default: `src/**/*.{js,jsx,ts,tsx}`

### Ignore Patterns

You can specify files and directories to ignore using either `.apxlintignore` or `ignore.apxlintrc`:

**Option 1: .apxlintignore (like .gitignore)**

Create `.apxlintignore` in your project root:

```
# Dependencies
node_modules/
bower_components/

# Build outputs
dist/
build/
*.min.js

# Coverage
coverage/

# IDE
.vscode/
.idea/
```

**Option 2: ignore.apxlintrc (JSON format)**

Create `ignore.apxlintrc` in your project root:

```json
{
  "ignore": [
    "node_modules/",
    "dist/",
    "build/",
    "*.min.js",
    "coverage/"
  ]
}
```

**Ignore patterns are automatically applied when present. The CLI looks for:**
1. `.apxlintignore` (first priority)
2. `ignore.apxlintrc` (second priority)

---

## Advanced Customization

### 1. Override Specific Rules

```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.recommended,
        rules: {
            'no-console': 'off',
            'max-len': ['error', 120],
            '@typescript-eslint/no-explicit-any': 'error'
        }
    }
];
```

### 2. Disable Multiple Rules

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

### 3. Custom Configuration with Merged Rules

```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.createConfig({
            strict: true,
            rules: {
                'max-len': ['error', 120],
                'indent': ['error', 2]
            },
            ignoreRules: ['no-console']
        })
    }
];
```

### 4. Different Configs for Different Files

```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    // Strict for source files
    {
        files: ['src/**/*.{ts,tsx}'],
        ...apxLinter.configs.strict
    },
    // Relaxed for test files
    {
        files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
        ...apxLinter.configs.relaxed
    },
    // Custom for scripts
    {
        files: ['scripts/**/*.js'],
        ...apxLinter.createConfig({
            rules: {
                'no-console': 'off'
            }
        })
    }
];
```

## Utility Functions

### `createConfig(options)`

Create a custom configuration with your own options.

**Options:**
- `rules` (Object): Custom rules to merge/override
- `ignoreRules` (Array): Rule names to disable
- `strict` (Boolean): Use strict mode

```javascript
const config = apxLinter.createConfig({
    strict: true,
    rules: {
        'max-len': ['error', 100]
    },
    ignoreRules: ['no-console', 'no-debugger']
});
```

### `disableRules(...ruleNames)`

Quickly disable multiple rules.

```javascript
module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.recommended,
        rules: {
            ...apxLinter.disableRules(
                'no-console',
                'no-debugger',
                '@typescript-eslint/no-explicit-any'
            )
        }
    }
];
```

### `overrideRuleSeverity(rules)`

Change severity of existing rules.

```javascript
module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.recommended,
        rules: {
            ...apxLinter.overrideRuleSeverity({
                'no-console': 'warn',
                '@typescript-eslint/no-explicit-any': 'error'
            })
        }
    }
];
```

### `mergeRules(...ruleConfigs)`

Merge multiple rule configurations.

```javascript
const projectRules = {
    'max-len': ['error', 100]
};

const teamRules = {
    'no-console': 'off'
};

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.recommended,
        rules: apxLinter.mergeRules(
            apxLinter.rules,
            projectRules,
            teamRules
        )
    }
];
```

## Available Configs

### `recommended` (Default)
Balanced configuration suitable for most projects.

### `strict`
Stricter enforcement with errors instead of warnings:
- `@typescript-eslint/no-explicit-any`: error
- `no-console`: error
- `no-debugger`: error
- `@typescript-eslint/no-unused-vars`: error
- `import/no-cycle`: error

### `relaxed`
Relaxed configuration for rapid development:
- `@typescript-eslint/no-explicit-any`: off
- `no-console`: off
- `import/no-cycle`: off

## Rule Highlights

- **Indentation**: 4 spaces (configurable)
- **Quotes**: Single quotes
- **Semicolons**: Required
- **Max line length**: 260 characters
- **Import order**: Flexible (can be customized)
- **React**: JSX in `.tsx` and `.ts` files
- **TypeScript**: Flexible with `any`, but warns by default

## TypeScript Support

This plugin is optimized for TypeScript projects and includes:
- TypeScript-specific rules via `@typescript-eslint`
- Import resolution for `.ts` and `.tsx` files
- React + TypeScript best practices
- TypeScript resolver included

---

## Usage Examples

### Basic Examples

#### Example 1: Simple React + TypeScript Project

```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.recommended
    }
];
```

#### Example 2: Using Different Presets

```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    // Strict mode for production code
    {
        files: ['src/**/*.{ts,tsx}'],
        ...apxLinter.configs.strict
    },
    // Relaxed mode for tests
    {
        files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
        ...apxLinter.configs.relaxed
    }
];
```

#### Example 3: Custom Rules

```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.createConfig({
            rules: {
                'indent': ['error', 2],  // 2 spaces instead of 4
                'max-len': ['error', 120],  // Shorter max line length
                'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off'
            }
        })
    }
];
```

### Advanced Scenarios

#### Example 4: Monorepo Configuration

```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    // Strict for library packages
    {
        files: ['packages/lib-*/**/*.{ts,tsx}'],
        ignores: ['**/*.test.{ts,tsx}'],
        ...apxLinter.configs.strict
    },
    // Recommended for app packages
    {
        files: ['packages/app-*/**/*.{ts,tsx}'],
        ignores: ['**/*.test.{ts,tsx}'],
        ...apxLinter.configs.recommended
    },
    // Relaxed for all tests
    {
        files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
        ...apxLinter.configs.relaxed
    },
    // Custom for scripts
    {
        files: ['scripts/**/*.js'],
        ...apxLinter.createConfig({
            rules: {
                'no-console': 'off',
                '@typescript-eslint/no-var-requires': 'off'
            }
        })
    }
];
```

#### Example 5: Environment-Specific Configuration

```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.createConfig({
            strict: isProduction,
            rules: {
                'no-console': isProduction ? 'error' : 'off',
                'no-debugger': isProduction ? 'error' : 'warn'
            }
        })
    }
];
```

#### Example 6: File-Type Specific Rules

```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    // Base config for all TypeScript files
    {
        files: ['**/*.{ts,tsx}'],
        ...apxLinter.configs.recommended
    },
    // Additional rules for React components
    {
        files: ['**/*.tsx'],
        rules: {
            'react/jsx-key': 'error',
            'react/jsx-no-target-blank': 'error'
        }
    },
    // Relaxed for config files
    {
        files: ['*.config.js', '*.setup.js'],
        ...apxLinter.createConfig({
            ignoreRules: ['@typescript-eslint/no-var-requires']
        })
    }
];
```

### Real-World Projects

#### Example 7: Next.js Project

```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    // Main source files
    {
        files: ['src/**/*.{ts,tsx}'],
        ignores: ['**/*.test.{ts,tsx}'],
        ...apxLinter.configs.strict
    },
    // Next.js pages (allow default exports)
    {
        files: ['pages/**/*.{ts,tsx}', 'app/**/*.{ts,tsx}'],
        rules: {
            'import/prefer-default-export': 'off',
            'react/function-component-definition': 'off'
        }
    },
    // API routes (allow console for logging)
    {
        files: ['pages/api/**/*.ts', 'app/api/**/*.ts'],
        ...apxLinter.createConfig({
            rules: {
                'no-console': 'off'
            }
        })
    },
    // Test files
    {
        files: ['**/*.test.{ts,tsx}', '**/__tests__/**/*.{ts,tsx}'],
        ...apxLinter.configs.relaxed
    }
];
```

#### Example 8: Library/Package Development

```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    // Source files (strict)
    {
        files: ['src/**/*.ts'],
        ignores: ['**/*.test.ts'],
        ...apxLinter.configs.strict,
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/explicit-function-return-type': 'error',
            'no-console': 'error'
        }
    },
    // Test files (relaxed)
    {
        files: ['**/*.test.ts', 'src/__tests__/**/*.ts'],
        ...apxLinter.configs.relaxed
    },
    // Examples (recommended)
    {
        files: ['examples/**/*.{ts,tsx}'],
        ...apxLinter.configs.recommended
    }
];
```

#### Example 9: Legacy Code Migration

```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    // New code (strict)
    {
        files: ['src/v2/**/*.{ts,tsx}'],
        ...apxLinter.configs.strict
    },
    // Legacy code (very relaxed, gradually improve)
    {
        files: ['src/legacy/**/*.{js,jsx}'],
        ...apxLinter.createConfig({
            ignoreRules: [
                '@typescript-eslint/no-explicit-any',
                'no-console',
                'no-debugger',
                'prefer-const',
                '@typescript-eslint/no-unused-vars'
            ],
            rules: {
                'no-undef': 'error',
                'no-duplicate-imports': 'warn'
            }
        })
    }
];
```

### Best Practices

**1. Start with Recommended, Then Customize**

```javascript
// Start simple
module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.recommended
    }
];
```

**2. Use Separate Configs for Different File Types**

```javascript
module.exports = [
    { files: ['src/**/*.ts'], ...strictConfig },
    { files: ['**/*.test.ts'], ...relaxedConfig },
    { files: ['scripts/**/*.js'], ...scriptsConfig }
];
```

**3. Document Your Customizations**

```javascript
module.exports = [
    {
        files: ['**/*.{ts,tsx}'],
        ...apxLinter.configs.recommended,
        rules: {
            // Disabled because we use a logger service
            'no-console': 'off',
            
            // Team preference: 2 spaces for indentation
            'indent': ['error', 2]
        }
    }
];
```

---

## Migration Guide

### Migrating from v1.x to v2.x

#### Major Changes in v2.0

1. **ESLint 9 Flat Config** - Uses ESLint 9's flat config format instead of legacy `.eslintrc`
2. **Multiple Presets** - `recommended`, `strict`, and `relaxed` configurations
3. **Utility Functions** - Helper functions for customization
4. **All Dependencies Bundled** - Includes ESLint and all plugins

#### Migration Steps

**Step 1: Update the Plugin**

```bash
npm install --save-dev eslint-plugin-apx-eslint@latest
```

This automatically installs ESLint 9 and all required plugins.

**Step 2: Convert Configuration File**

**Old Format (.eslintrc.json):**
```json
{
  "extends": ["plugin:apx-eslint/recommended"],
  "rules": {
    "no-console": "off"
  }
}
```

**New Format (eslint.config.js):**
```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.recommended,
        rules: {
            'no-console': 'off'
        }
    }
];
```

**Step 3: Delete Old Config Files**

Remove these files if they exist:
- `.eslintrc.js`
- `.eslintrc.json`
- `.eslintrc.yml`
- `.eslintrc.yaml`
- `eslintConfig` section in `package.json`

#### Migration Examples

**Before - Multiple Configurations:**
```json
{
  "extends": ["plugin:apx-eslint/recommended"],
  "overrides": [
    {
      "files": ["**/*.test.ts"],
      "rules": {
        "no-console": "off"
      }
    }
  ]
}
```

**After:**
```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{ts,tsx}'],
        ignores: ['**/*.test.ts'],
        ...apxLinter.configs.recommended
    },
    {
        files: ['**/*.test.ts'],
        ...apxLinter.configs.relaxed
    }
];
```

**Before - Ignoring Files (.eslintignore):**
```
node_modules
dist
build
```

**After (in eslint.config.js):**
```javascript
module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ignores: [
            'node_modules/**',
            'dist/**',
            'build/**'
        ],
        ...apxLinter.configs.recommended
    }
];
```

#### New Features You Can Use

**Different Presets:**
```javascript
// Strict mode for production
{
    files: ['src/**/*.ts'],
    ...apxLinter.configs.strict
}

// Relaxed mode for tests
{
    files: ['**/*.test.ts'],
    ...apxLinter.configs.relaxed
}
```

**Easily Disable Rules:**
```javascript
module.exports = [
    {
        files: ['**/*.{ts,tsx}'],
        ...apxLinter.createConfig({
            ignoreRules: ['no-console', 'no-debugger']
        })
    }
];
```

**Use Utility Functions:**
```javascript
module.exports = [
    {
        files: ['**/*.{ts,tsx}'],
        ...apxLinter.configs.recommended,
        rules: {
            ...apxLinter.disableRules('no-console', 'no-debugger'),
            ...apxLinter.overrideRuleSeverity({
                '@typescript-eslint/no-explicit-any': 'error'
            })
        }
    }
];
```

---

## Troubleshooting

### "Cannot find module 'eslint-plugin-apx-eslint'"

**Solution:** Install the package:
```bash
npm install --save-dev eslint-plugin-apx-eslint
```

### "Unexpected token 'export'"

**Solution:** ESLint 9 requires `.js` or `.mjs` files, not `.json`. Use `eslint.config.js`.

### Rules Not Working as Expected

**Solution:** Check that you're spreading the config correctly:

```javascript
// Correct ✓
{
    files: ['**/*.ts'],
    ...apxLinter.configs.recommended
}

// Incorrect ✗
{
    files: ['**/*.ts'],
    config: apxLinter.configs.recommended
}
```

### Import Resolution Errors

**Solution:** The TypeScript resolver is included. Make sure you have a `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### ESLint Not Found

**Solution:** ESLint is included with this package. Try reinstalling:

```bash
npm install
```

---

## Testing

### Running Tests

```bash
npm test
```

This runs the test suite with multiple configuration examples.

### Testing Your Configuration

Using the CLI tool:
```bash
# Lint with CLI
npx apx-lint

# Lint and fix with CLI
npx apx-lint --fix

# Lint specific paths with CLI
npx apx-lint "src/**/*.tsx"
```

Using ESLint directly:
```bash
# Lint your entire project
npx eslint .

# Lint specific files
npx eslint src/**/*.tsx

# Fix auto-fixable issues
npx eslint . --fix

# Check specific config
npx eslint --config eslint.config.js src/
```

---

## Changelog

### [2.0.0] - 2024-10-10

#### 🎉 Major Release - Complete Refactor

**Added:**
- ESLint 9 flat config support
- Multiple presets: `recommended`, `strict`, `relaxed`
- Utility functions: `createConfig()`, `disableRules()`, `overrideRuleSeverity()`, `mergeRules()`
- All dependencies bundled (including ESLint)
- Comprehensive documentation and examples
- Test suite with multiple configurations

**Changed:**
- **Breaking:** Configuration format changed from `.eslintrc` to flat config
- **Breaking:** Minimum Node.js version is 18.0.0
- **Breaking:** Minimum ESLint version is 9.37.0 (bundled)
- All dependencies moved from `peerDependencies` to `dependencies`
- Updated all ESLint plugins to latest versions

**Improved:**
- TypeScript and React integration
- Import resolution configuration
- Documentation and examples
- Developer experience

**Fixed:**
- Import resolution issues with TypeScript paths
- React version detection warnings
- Peer dependency conflicts

### [1.0.18] - Previous

**Legacy Version**
- Support for ESLint 8.x
- Legacy `.eslintrc` configuration format
- All dependencies as peer dependencies

---

## Contributing

Issues and pull requests are welcome! Please visit our [GitHub repository](https://github.com/appna-io/apx-linter).

## License

ISC

---

## Links

- [GitHub Repository](https://github.com/appna-io/apx-linter)
- [npm Package](https://www.npmjs.com/package/eslint-plugin-apx-eslint)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files)

---

**Made with ❤️ by AppNaX**
