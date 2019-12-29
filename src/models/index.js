const requireDir = require('require-dir');

module.exports = requireDir(__dirname, {
    mapKey(value, baseName) {
        return `${baseName[0].toUpperCase()}${baseName.slice(1)}`;
    },
});
