# Examples

This directory contains example projects demonstrating how to use `eslint-plugin-apx-eslint` in different scenarios.

## Available Examples

### 1. [Basic Project](./basic-project)

The simplest setup using the recommended configuration.

**Best for:**
- Getting started quickly
- Simple projects
- Learning the basics

**Configuration:**
```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.recommended
    }
];
```

### 2. [Advanced Project](./advanced-project)

Demonstrates advanced features including:
- Multiple configurations for different file types
- Different strictness levels (strict, relaxed)
- Custom rule overrides
- Using utility functions

**Best for:**
- Complex projects
- Monorepos
- Projects with different linting needs for different areas

**Configuration:**
```javascript
module.exports = [
    { files: ['src/**/*.{ts,tsx}'], ...apxLinter.configs.strict },
    { files: ['**/*.test.{ts,tsx}'], ...apxLinter.configs.relaxed },
    { files: ['scripts/**/*.js'], ...apxLinter.createConfig({ ... }) }
];
```

## Running Examples

Each example is a standalone project:

```bash
# Navigate to an example
cd examples/basic-project

# Install dependencies
npm install

# Run linting
npm run lint

# Auto-fix issues
npm run lint:fix
```

## Learning Path

1. **Start with Basic Project** - Understand the core concepts
2. **Explore Advanced Project** - Learn customization options
3. **Check USAGE_EXAMPLES.md** - See 15+ real-world scenarios
4. **Review Test Configs** - See working configurations in `../test/configs/`

## Creating Your Own Config

After reviewing these examples, create your own configuration:

```bash
# In your project
npm install --save-dev eslint eslint-plugin-apx-eslint

# Create eslint.config.js
touch eslint.config.js
```

Then choose a starting point:

**Option A: Recommended (Balanced)**
```javascript
const apxLinter = require('eslint-plugin-apx-eslint');
module.exports = [
    { files: ['**/*.{ts,tsx}'], ...apxLinter.configs.recommended }
];
```

**Option B: Strict (Enforced)**
```javascript
const apxLinter = require('eslint-plugin-apx-eslint');
module.exports = [
    { files: ['**/*.{ts,tsx}'], ...apxLinter.configs.strict }
];
```

**Option C: Custom (Full Control)**
```javascript
const apxLinter = require('eslint-plugin-apx-eslint');
module.exports = [
    {
        files: ['**/*.{ts,tsx}'],
        ...apxLinter.createConfig({
            strict: true,
            rules: { /* your custom rules */ },
            ignoreRules: ['no-console']
        })
    }
];
```

## Need More Help?

- Read the [main README](../README.md)
- Check [USAGE_EXAMPLES.md](../USAGE_EXAMPLES.md)
- Review [MIGRATION.md](../MIGRATION.md) if upgrading
- Look at [test configurations](../test/configs/)

## Contributing Examples

Have a useful configuration example? We'd love to see it!

1. Create a new directory under `examples/`
2. Add `eslint.config.js`, `package.json`, and `README.md`
3. Submit a pull request

Examples we'd love to see:
- Next.js projects
- React Native projects
- Monorepo setups
- Library/package development
- Full-stack applications

