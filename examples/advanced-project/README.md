# Advanced Project Example

This example demonstrates advanced usage of `eslint-plugin-apx-eslint` with:
- Multiple configurations for different file types
- Different strictness levels
- Custom rule overrides
- Utility function usage

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run linting:
```bash
npm run lint
```

## Features Demonstrated

### 1. Different Configs for Different Files

- **Source files** (`src/**/*.{ts,tsx}`): Uses `strict` mode
- **Test files** (`**/*.test.{ts,tsx}`): Uses `relaxed` mode
- **Scripts** (`scripts/**/*.{js,ts}`): Custom config allowing console
- **Config files** (`*.config.{js,ts}`): Ignores specific rules

### 2. Custom Rule Overrides

The scripts directory allows `console.log` and `require()`:

```javascript
{
    files: ['scripts/**/*.{js,ts}'],
    ...apxLinter.createConfig({
        rules: {
            'no-console': 'off',
            '@typescript-eslint/no-var-requires': 'off'
        }
    })
}
```

### 3. Ignoring Rules

Config files ignore TypeScript require rules:

```javascript
{
    files: ['*.config.{js,ts}'],
    ...apxLinter.createConfig({
        ignoreRules: ['@typescript-eslint/no-var-requires']
    })
}
```

### 4. Ignoring Files

Uses `ignore.apxlintrc` to exclude files from linting:

```json
{
  "ignore": [
    "node_modules/",
    "dist/",
    "build/",
    "*.config.js"
  ]
}
```

## Running Specific Lints

```bash
# Lint only source files
npm run lint:src

# Lint only test files
npm run lint:tests

# Lint everything
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

## Configuration Breakdown

The `eslint.config.js` exports an array of configurations:

```javascript
module.exports = [
    // Config 1: Strict for source
    { files: ['src/**/*.{ts,tsx}'], ...strict },
    
    // Config 2: Relaxed for tests
    { files: ['**/*.test.{ts,tsx}'], ...relaxed },
    
    // Config 3: Custom for scripts
    { files: ['scripts/**/*.{js,ts}'], ...custom },
    
    // Config 4: Custom for configs
    { files: ['*.config.{js,ts}'], ...custom }
];
```

This allows fine-grained control over linting rules based on file type and purpose.

