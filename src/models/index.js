module.exports = require('require-dir')(__dirname, {
    mapKey(value, baseName) {
        return `${baseName[0].toUpperCase()}${baseName.slice(1)}`;
    },
});
