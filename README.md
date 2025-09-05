# AppNA-X ESLint Plugin

[![Apx Eslint](https://img.shields.io/badge/apx-linter-blue.svg)](https://github.com/appna-io/apx-linter)
[![AppNA.io](https://img.shields.io/badge/appna-io--X-orange.svg)](https://appna.io)
[![apx-ui](https://img.shields.io/badge/tag-apx--ui-purple.svg)](https://github.com/appna-io/apx-linter)
[![apx-ui](https://img.shields.io/badge/tag-AllInOne--Utility-purple.svg)](https://github.com/appna-io/apx-linter)


A comprehensive ESLint plugin for AppNA-X projects, providing standardized linting rules and configurations for React, TypeScript, and modern JavaScript development.

## All-in-One Linter Solution

**No need to install multiple plugins!** This is a complete, all-in-one ESLint solution that includes all recommended linting rules for modern development. Everything you need is bundled in one package - from code style and formatting to TypeScript, React, accessibility, and security best practices.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Rules](#rules)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install the plugin as a development dependency:

```bash
npm install eslint-plugin-apx-eslint --save-dev
```

Or using yarn:

```bash
yarn add eslint-plugin-apx-eslint --dev
```

## Quick Start

This plugin provides a comprehensive set of ESLint rules optimized for AppNA-X projects. It includes configurations for:

- React and JSX
- TypeScript
- Import/Export management
- Code formatting and style
- Accessibility (a11y)
- Security best practices

## Usage

### Basic Configuration

Add `apx-eslint` to your ESLint configuration file:

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:apx-eslint/recommended"
  ],
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "rules": {
    // Add custom rules or override existing rules here
  }
}
```

## Rules

This plugin includes a comprehensive set of rules organized by category:

### Code Style & Formatting

- `object-curly-spacing`: Enforces consistent spacing inside braces
- `comma-spacing`: Enforces consistent spacing before and after commas
- `quotes`: Enforces the use of single quotes
- `indent`: Enforces consistent indentation (tab-based)
- `no-tabs`: Disallows the use of tab characters (except for indentation)
- `comma-dangle`: Requires or disallows trailing commas
- `semi`: Requires or disallows semicolons
- `space-before-blocks`: Enforces consistent spacing before blocks
- `keyword-spacing`: Enforces consistent spacing before and after keywords
- `no-trailing-spaces`: Disallows trailing whitespace at the end of lines
- `linebreak-style`: Enforces consistent linebreak style
- `max-len`: Enforces a maximum line length (250 characters)

### Code Quality & Complexity

- `max-lines-per-function`: Enforces a maximum number of lines per function (500)
- `max-lines`: Enforces a maximum number of lines per file (450)
- `max-depth`: Enforces a maximum depth that blocks can be nested
- `no-multiple-empty-lines`: Disallows multiple empty lines
- `no-console`: Disallows the use of `console` (warning level)
- `no-param-reassign`: Disallows reassigning function parameters

### TypeScript

- `@typescript-eslint/explicit-function-return-type`: Requires explicit return types on functions
- `@typescript-eslint/no-use-before-define`: Disallows the use of variables before they are defined
- `@typescript-eslint/no-explicit-any`: Disallows usage of the `any` type
- `@typescript-eslint/indent`: Enforces consistent indentation for TypeScript
- `@typescript-eslint/type-annotation-spacing`: Enforces consistent spacing around type annotations

### React & JSX

- `react/jsx-one-expression-per-line`: Enforces one JSX element per line
- `react/jsx-props-no-spreading`: Disallows JSX props spreading
- `jsx-a11y/label-has-associated-control`: Enforces that a `label` tag has a text label and an associated control

### Import/Export Management

- `import/order`: Enforces a convention in module import order
- `import/no-named-as-default`: Disallows using named exports as default exports
- `import/prefer-default-export`: Prefer default export if module exports a single name
- `import/no-default-export`: Disallows default exports
- `global-require`: Disallows `require` calls to be mixed with regular variable declarations

### Function & Class Rules

- `arrow-body-style`: Enforces consistent arrow function body style
- `func-names`: Enforces named function expressions
- `guard-for-in`: Requires `for-in` loops to include an `if` statement
- `lines-between-class-members`: Requires or disallows an empty line between class members
- `class-methods-use-this`: Enforces that class methods utilize `this`

## Configuration

You can configure the rules in your ESLint configuration file:

```json
{
  "rules": {
    "apx-eslint/object-curly-spacing": ["error", "always"],
    "apx-eslint/comma-spacing": ["error", { "before": false, "after": true }],
    "apx-eslint/quotes": ["error", "single"],
    "apx-eslint/no-param-reassign": ["error", { "props": true, "ignorePropertyModificationsFor": ["draft"] }],
    "apx-eslint/max-lines-per-function": ["error", 500],
    "apx-eslint/max-lines": ["error", { "max": 450 }],
    "apx-eslint/max-depth": "error",
    "apx-eslint/no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }],
    "apx-eslint/import/no-named-as-default": ["off"],
    "apx-eslint/arrow-body-style": ["off"],
    "apx-eslint/func-names": ["off"],
    "apx-eslint/guard-for-in": ["off"],
    "apx-eslint/lines-between-class-members": ["off"],
    "apx-eslint/jsx-a11y/label-has-associated-control": ["off"],
    "apx-eslint/import/prefer-default-export": "off",
    "apx-eslint/import/no-default-export": "off",
    "apx-eslint/react/jsx-one-expression-per-line": ["off"],
    "apx-eslint/class-methods-use-this": ["off"],
    "apx-eslint/max-len": ["error", { "code": 250 }],
    "apx-eslint/@typescript-eslint/explicit-function-return-type": ["off"],
    "apx-eslint/@typescript-eslint/no-use-before-define": ["off"],
    "apx-eslint/@typescript-eslint/no-explicit-any": ["off"],
    "apx-eslint/no-trailing-spaces": ["error", { "skipBlankLines": true, "ignoreComments": true }],
    "apx-eslint/react/jsx-props-no-spreading": ["off"],
    "apx-eslint/linebreak-style": 0,
    "apx-eslint/global-require": 0,
    "apx-eslint/eslint-linebreak-style": [0, "error", "windows"],
    "apx-eslint/indent": ["error", "tab", { "SwitchCase": 1 }],
    "apx-eslint/no-tabs": ["error", { "allowIndentationTabs": true }],
    "apx-eslint/@typescript-eslint/indent": ["error", "tab"],
    "apx-eslint/comma-dangle": ["error", "only-multiline"],
    "apx-eslint/no-console": 1,
    "apx-eslint/semi": ["error", "always"],
    "apx-eslint/import/order": ["error", {
      "groups": ["builtin", "internal", "external"],
      "newlines-between": "always"
    }],
    "apx-eslint/space-before-blocks": ["error", "always"],
    "apx-eslint/keyword-spacing": ["error", { "before": true, "after": true }],
    "apx-eslint/@typescript-eslint/type-annotation-spacing": ["error"]
  }
}
```

## Contributing

We welcome contributions to the AppNA-X ESLint Plugin! Please follow these guidelines:

### Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/apx-linter.git`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

### Submitting Changes

1. Make your changes and test them thoroughly
2. Run the linter: `npm run lint`
3. Run tests: `npm test`
4. Commit your changes: `git commit -m "Add: your feature description"`
5. Push to your fork: `git push origin feature/your-feature-name`
6. Create a Pull Request

### Code Style

- Follow the existing code style and formatting rules
- Add appropriate tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:

- Create an issue on [GitHub](https://github.com/appna-io/apx-linter/issues)
- Contact the AppNA DevOps team

## Changelog

### Version 1.0.7
- Initial release with comprehensive ESLint rules
- Support for React, TypeScript, and modern JavaScript
- AppNA-X project optimization
