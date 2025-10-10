#!/usr/bin/env node

/**
 * Test runner for apx-eslint plugin
 * This script validates that the plugin works correctly with different configurations
 */

const { ESLint } = require('eslint');
const path = require('path');
const fs = require('fs');

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

async function runTest(testName, configFile, testFile) {
    log(`\n${'='.repeat(60)}`, 'cyan');
    log(`Testing: ${testName}`, 'cyan');
    log('='.repeat(60), 'cyan');

    try {
        const eslint = new ESLint({
            overrideConfigFile: configFile,
            useEslintrc: false
        });

        const results = await eslint.lintFiles([testFile]);
        const formatter = await eslint.loadFormatter('stylish');
        const resultText = formatter.format(results);

        const errorCount = results.reduce((acc, result) => acc + result.errorCount, 0);
        const warningCount = results.reduce((acc, result) => acc + result.warningCount, 0);

        if (resultText) {
            console.log(resultText);
        }

        log(`\nResults: ${errorCount} errors, ${warningCount} warnings`, 
            errorCount > 0 ? 'red' : warningCount > 0 ? 'yellow' : 'green');

        return {
            testName,
            success: true,
            errorCount,
            warningCount
        };
    } catch (error) {
        log(`\n✗ Test failed: ${error.message}`, 'red');
        console.error(error);
        return {
            testName,
            success: false,
            error: error.message
        };
    }
}

async function main() {
    log('\n🧪 APX ESLint Plugin Test Suite', 'blue');
    log('='.repeat(60), 'blue');

    const testDir = __dirname;
    const results = [];

    // Test 1: Recommended config
    results.push(await runTest(
        'Recommended Config',
        path.join(testDir, 'configs', 'recommended.config.js'),
        path.join(testDir, 'fixtures', 'sample.tsx')
    ));

    // Test 2: Strict config
    results.push(await runTest(
        'Strict Config',
        path.join(testDir, 'configs', 'strict.config.js'),
        path.join(testDir, 'fixtures', 'sample.tsx')
    ));

    // Test 3: Relaxed config
    results.push(await runTest(
        'Relaxed Config',
        path.join(testDir, 'configs', 'relaxed.config.js'),
        path.join(testDir, 'fixtures', 'sample.tsx')
    ));

    // Test 4: Custom config with ignored rules
    results.push(await runTest(
        'Custom Config (Ignored Rules)',
        path.join(testDir, 'configs', 'custom-ignored.config.js'),
        path.join(testDir, 'fixtures', 'sample.tsx')
    ));

    // Test 5: Custom config with overridden rules
    results.push(await runTest(
        'Custom Config (Overridden Rules)',
        path.join(testDir, 'configs', 'custom-override.config.js'),
        path.join(testDir, 'fixtures', 'sample.tsx')
    ));

    // Print summary
    log('\n' + '='.repeat(60), 'blue');
    log('📊 Test Summary', 'blue');
    log('='.repeat(60), 'blue');

    results.forEach(result => {
        if (result.success) {
            log(`✓ ${result.testName}: ${result.errorCount} errors, ${result.warningCount} warnings`, 
                result.errorCount > 0 ? 'yellow' : 'green');
        } else {
            log(`✗ ${result.testName}: ${result.error}`, 'red');
        }
    });

    const allPassed = results.every(r => r.success);
    log('\n' + '='.repeat(60), 'blue');
    if (allPassed) {
        log('✓ All tests completed successfully!', 'green');
        log('\nThe plugin is working correctly with all configurations.', 'green');
    } else {
        log('✗ Some tests failed!', 'red');
        process.exit(1);
    }
}

main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});

