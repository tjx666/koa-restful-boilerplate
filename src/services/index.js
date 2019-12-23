const services = require('require-dir')(__dirname, {
    mapKey: (value, baseName) => `${baseName}Service`,
});

module.exports = services;
