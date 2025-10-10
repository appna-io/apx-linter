# Basic Project Example

This example demonstrates the most basic usage of `eslint-plugin-apx-eslint`.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run linting:
```bash
npm run lint
```

3. Auto-fix issues:
```bash
npm run lint:fix
```

## Files

- `eslint.config.js` - ESLint configuration using the recommended preset
- `package.json` - Dependencies and scripts
- `.apxlintrc.json` - Configures paths to lint
- `.apxlintignore` - Files and directories to ignore
- `src/App.tsx` - Sample TypeScript React component

## Configuration

The `eslint.config.js` uses the recommended preset:

```javascript
const apxLinter = require('eslint-plugin-apx-eslint');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.recommended
    }
];
```

This provides a balanced configuration suitable for most TypeScript + React projects.

