const { argv } = require('yargs');

exports.server = {
    hostname: argv.HOST || process.env.HOST || '127.0.0.1',
    port: Number(argv.PORT || process.env.PORT || 3000),
};

exports.security = {
    jwtSecret: 'development_jwt_secret',
    passwordHashSaltRounds: 10,
};

exports.db = {
    dbName: 'coo-dev',
    hostname: '127.0.0.1',
    port: 27017,
    connectOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};
