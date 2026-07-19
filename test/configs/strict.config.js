const apxLinter = require('../../eslint-plugin-apx-eslint.js');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.strict
    }
];

