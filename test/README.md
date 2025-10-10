# APX ESLint Plugin - Test Suite

This directory contains the test suite for the `eslint-plugin-apx-eslint` package.

## Directory Structure

```
test/
├── configs/           # Different ESLint configurations for testing
│   ├── recommended.config.js
│   ├── strict.config.js
│   ├── relaxed.config.js
│   ├── custom-ignored.config.js
│   └── custom-override.config.js
├── fixtures/          # Sample files to lint
│   └── sample.tsx
├── run-tests.js       # Test runner script
└── README.md         # This file
```

## Running Tests

To run all tests:

```bash
npm test
```

Or directly:

```bash
node test/run-tests.js
```

## What Gets Tested

The test suite validates:

1. **Recommended Config** - Default configuration works correctly
2. **Strict Config** - Stricter rules are enforced
3. **Relaxed Config** - More permissive rules
4. **Custom Ignored Rules** - Ability to ignore specific rules
5. **Custom Override Rules** - Ability to override and customize rules

## Test Configuration Examples

### 1. Recommended Configuration
```javascript
// test/configs/recommended.config.js
const apxLinter = require('../../index.js');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.recommended
    }
];
```

### 2. Custom Configuration with Ignored Rules
```javascript
// test/configs/custom-ignored.config.js
const apxLinter = require('../../index.js');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.createConfig({
            ignoreRules: [
                'no-console',
                '@typescript-eslint/no-unused-vars',
                '@typescript-eslint/no-explicit-any'
            ]
        })
    }
];
```

### 3. Custom Configuration with Overridden Rules
```javascript
// test/configs/custom-override.config.js
const apxLinter = require('../../index.js');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.createConfig({
            rules: {
                'max-len': ['error', 120],
                'indent': ['error', 2],
                'no-console': 'off',
                '@typescript-eslint/no-explicit-any': 'error'
            }
        })
    }
];
```

## Test Fixture

The `sample.tsx` file intentionally contains various linting issues to test that the plugin correctly:

- Detects unused variables
- Warns about console.log statements
- Validates TypeScript `any` type usage
- Checks formatting rules (spacing, indentation, etc.)
- Validates React component structure

## Expected Test Results

### Recommended Config
- Should show warnings for:
  - Unused variables
  - Console statements
  - Use of `any` type

### Strict Config
- Should show errors (not warnings) for:
  - Console statements
  - Use of `any` type
  - Unused variables

### Relaxed Config
- Should be more permissive and show fewer warnings

### Custom Configs
- Should demonstrate that rules can be successfully:
  - Ignored (turned off)
  - Overridden (changed severity or configuration)

## Adding New Tests

To add a new test:

1. Create a new config file in `test/configs/`
2. Add a test fixture in `test/fixtures/` if needed
3. Update `test/run-tests.js` to include the new test
4. Run `npm test` to verify

Example:

```javascript
// test/configs/my-custom.config.js
const apxLinter = require('../../index.js');

module.exports = [
    {
        files: ['**/*.{ts,tsx}'],
        ...apxLinter.createConfig({
            strict: true,
            rules: {
                // Your custom rules
            }
        })
    }
];
```

Then in `run-tests.js`, add:

```javascript
results.push(await runTest(
    'My Custom Config',
    path.join(testDir, 'configs', 'my-custom.config.js'),
    path.join(testDir, 'fixtures', 'sample.tsx')
));
```

## Notes

- Tests are NOT included in the published npm package (see `.npmignore`)
- The test runner provides colored output for easy result reading
- All test configs demonstrate real-world usage patterns
- Tests validate that the plugin works with ESLint 9's flat config format

## Troubleshooting

If tests fail:

1. Make sure all dependencies are installed: `npm install`
2. Check that you have ESLint 9+ installed
3. Verify the sample fixture contains expected linting issues
4. Check the test output for specific error messages

## Contributing

When contributing to the plugin:

1. Add tests for new features
2. Ensure all existing tests pass
3. Update test documentation as needed
4. Consider adding new test fixtures for edge cases

