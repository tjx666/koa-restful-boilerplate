const _ = require('lodash');
const uuidV1 = require('uuid/v1');
const devConfig = require('./development.config');

exports.server = {
    port: 8080,
};

exports.security = {
    jwtSecret: process.env.JWT_SECRET || uuidV1(),
    passwordHashSaltRounds:
        process.env.PWD_HASH_SALT || Math.floor(5 + Math.random() * 11),
};

exports.db = {
    dbName: 'coo',
};

module.exports = _.merge(devConfig, exports);
