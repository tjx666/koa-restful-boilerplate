const { env } = require('../utils/env');

const config = require(`./${env}.config`);

const { server: serverConfig, db: dbConfig } = config;
serverConfig.address = `http://${serverConfig.hostname}:${serverConfig.port}`;
dbConfig.address = `mongodb://${dbConfig.hostname}:${dbConfig.port}/${dbConfig.dbName}`;

module.exports = {
    ...config,
};
