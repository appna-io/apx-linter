#!/usr/bin/env node

/**
 * APX Lint CLI
 * Convenient wrapper for ESLint with customizable paths
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const projectName = chalk.bold.cyan('APX Lint');

// Box console replacement
function boxConsole(lines) {
    const maxLength = Math.max(...lines.map(line => stripAnsi(line).length));
    const border = '─'.repeat(maxLength + 4);
    
    console.log(chalk.cyan('┌' + border + '┐'));
    lines.forEach(line => {
        const padding = ' '.repeat(maxLength - stripAnsi(line).length);
        console.log(chalk.cyan('│') + '  ' + line + padding + '  ' + chalk.cyan('│'));
    });
    console.log(chalk.cyan('└' + border + '┘'));
}

function stripAnsi(str) {
    return str.replace(/\x1b\[[0-9;]*m/g, '');
}

function showHelp() {
    console.log(chalk.cyan('\n╔════════════════════════════════════════════════════════════════╗'));
    console.log(chalk.cyan('║                       APX Lint CLI                             ║'));
    console.log(chalk.cyan('╚════════════════════════════════════════════════════════════════╝'));
    console.log(chalk.bold('\nUsage:'));
    console.log('  apx-lint [options] [path]');
    console.log(chalk.bold('\nOptions:'));
    console.log('  --fix          Auto-fix linting errors');
    console.log('  --help, -h     Show this help message');
    console.log('  --version, -v  Show version number');
    console.log(chalk.bold('\nExamples:'));
    console.log('  apx-lint                              # Lint default paths');
    console.log('  apx-lint --fix                        # Lint and auto-fix default paths');
    console.log('  apx-lint src/                         # Lint specific directory');
    console.log('  apx-lint --fix "src/**/*.{ts,tsx}"    # Lint and fix with custom pattern');
    console.log(chalk.bold('\nConfiguration:'));
    console.log('  Create .apxlintrc.json in your project root to customize default paths:');
    console.log('  {');
    console.log('    "paths": ["src/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}"]');
    console.log('  }');
    console.log(chalk.bold('\nIgnore Patterns:'));
    console.log('  Create .apxlintignore or ignore.apxlintrc to exclude files:');
    console.log('  node_modules/');
    console.log('  dist/');
    console.log('  build/');
    console.log('  *.min.js');
    console.log('\n');
}

function getVersion() {
    try {
        const packagePath = path.join(__dirname, '..', 'package.json');
        const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        return pkg.version;
    } catch (error) {
        return 'unknown';
    }
}

function loadConfig() {
    const configPaths = [
        path.join(process.cwd(), '.apxlintrc.json'),
        path.join(process.cwd(), '.apxlintrc'),
        path.join(process.cwd(), 'package.json')
    ];

    for (const configPath of configPaths) {
        if (fs.existsSync(configPath)) {
            try {
                const content = fs.readFileSync(configPath, 'utf8');
                const config = JSON.parse(content);
                
                if (configPath.endsWith('package.json')) {
                    return config.apxlint || null;
                }
                
                return config;
            } catch (error) {
                // Continue to next config file
            }
        }
    }
    
    return null;
}

function loadIgnorePatterns() {
    const ignorePaths = [
        path.join(process.cwd(), '.apxlintignore'),
        path.join(process.cwd(), 'ignore.apxlintrc')
    ];

    for (const ignorePath of ignorePaths) {
        if (fs.existsSync(ignorePath)) {
            try {
                const content = fs.readFileSync(ignorePath, 'utf8');
                
                // Check if it's JSON format
                if (ignorePath.endsWith('.apxlintrc')) {
                    try {
                        const config = JSON.parse(content);
                        return config.ignore || config.ignorePatterns || [];
                    } catch (e) {
                        // Not JSON, treat as line-separated patterns
                    }
                }
                
                // Parse as line-separated patterns (like .gitignore)
                return content
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line && !line.startsWith('#'))
                    .filter(line => line.length > 0);
            } catch (error) {
                // Continue to next ignore file
            }
        }
    }
    
    return [];
}

function getDefaultPaths(config) {
    if (config && config.paths) {
        return Array.isArray(config.paths) ? config.paths : [config.paths];
    }
    
    // Default paths
    return ['src/**/*.{js,jsx,ts,tsx}'];
}

function printHeader(message) {
    console.log(chalk.greenBright('='.repeat(60)));
    console.log(chalk.greenBright(`🚀 ${projectName} - ${message}`));
    console.log(chalk.greenBright('='.repeat(60)));
}

function printFooter(success = true) {
    console.log(chalk.greenBright('='.repeat(60)));
    if (success) {
        console.log(chalk.greenBright(`✅ ${projectName} - Linting completed!`));
    } else {
        console.log(chalk.yellow(`⚠️  ${projectName} - Linting completed with issues`));
    }
    console.log(chalk.greenBright('='.repeat(60)));
}

function runESLint(args, options = {}) {
    return new Promise((resolve, reject) => {
        // Find eslint in node_modules
        const eslintPath = path.join(__dirname, '..', 'node_modules', '.bin', 'eslint');
        
        // Check if eslint exists, otherwise use global
        const command = fs.existsSync(eslintPath) ? eslintPath : 'npx';
        const finalArgs = fs.existsSync(eslintPath) ? args : ['eslint', ...args];
        
        console.log(chalk.cyan.bold('\n🔍 Running ESLint...\n'));
        
        const eslint = spawn(command, finalArgs, {
            stdio: 'inherit',
            shell: true,
            cwd: process.cwd()
        });

        eslint.on('close', (code) => {
            if (code === 0) {
                printFooter(true);
                resolve(code);
            } else {
                printFooter(false);
                resolve(code);
            }
        });

        eslint.on('error', (error) => {
            console.log(chalk.red.bold(`\n✗ Error running ESLint: ${error.message}\n`));
            reject(error);
        });
    });
}

async function main() {
    const args = process.argv.slice(2);
    
    // Check for help flag
    if (args.includes('--help') || args.includes('-h')) {
        showHelp();
        process.exit(0);
    }
    
    // Check for version flag
    if (args.includes('--version') || args.includes('-v')) {
        console.log(chalk.cyan(`${projectName} v${getVersion()}`));
        process.exit(0);
    }
    
    // Parse arguments
    const hasFix = args.includes('--fix');
    const customPaths = args.filter(arg => !arg.startsWith('--'));
    
    // Load configuration
    const config = loadConfig();
    const ignorePatterns = loadIgnorePatterns();
    
    // Determine paths to lint
    let paths;
    if (customPaths.length > 0) {
        paths = customPaths;
    } else {
        paths = getDefaultPaths(config);
    }
    
    // Build ESLint arguments
    const eslintArgs = [];
    
    if (hasFix) {
        eslintArgs.push('--fix');
    }
    
    // Add ignore patterns
    if (ignorePatterns.length > 0) {
        ignorePatterns.forEach(pattern => {
            eslintArgs.push('--ignore-pattern');
            eslintArgs.push(pattern);
        });
    }
    
    // Add paths
    eslintArgs.push(...paths);
    
    // Show what we're linting
    printHeader(hasFix ? 'Auto-fixing Issues' : 'Checking Code Quality');
    
    const configInfo = [
        `${chalk.cyan('Mode:')} ${hasFix ? chalk.green('Fix') : chalk.blue('Check')}`,
        `${chalk.cyan('Paths:')} ${chalk.yellow(paths.join(', '))}`
    ];
    
    if (ignorePatterns.length > 0) {
        configInfo.push(`${chalk.cyan('Ignoring:')} ${chalk.yellow(ignorePatterns.length + ' pattern(s)')}`);
    }
    
    boxConsole(configInfo);
    
    try {
        const exitCode = await runESLint(eslintArgs);
        process.exit(exitCode);
    } catch (error) {
        console.log(chalk.red.bold(`\nFatal error: ${error.message}`));
        process.exit(1);
    }
}

// Run CLI
main().catch(error => {
    console.log(chalk.red.bold(`\nFatal error: ${error.message}`));
    process.exit(1);
});
