const requireDir = require('require-dir');

const services = requireDir(__dirname, {
    mapKey: (value, baseName) => `${baseName}Service`,
});

module.exports = services;
