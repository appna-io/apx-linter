const apxLinter = require('../../index.js');

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...apxLinter.configs.relaxed
    }
];

