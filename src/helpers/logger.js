const { resolve } = require('path');
const { promisify } = require('util');
const log4js = require('log4js');
const rm = require('rimraf');

const { isProd } = require('../../utils/env');

const projectRoot = resolve(__dirname, '../../');
const clearLogs = async () => {
    await promisify(rm)(resolve(projectRoot, './logs'));
};

const appLogPath = resolve(projectRoot, './logs/application.log');
const ctxLogPath = resolve(projectRoot, './logs/context.log');
const appErrorLogPath = resolve(projectRoot, './logs/application.error.log');
const ctxErrorLogPath = resolve(projectRoot, './logs/context.error.log');

const configuration = {
    appenders: {
        appFile: {
            type: 'dateFile',
            filename: appLogPath,
        },
        ctxFile: {
            type: 'dateFile',
            filename: ctxLogPath,
        },
        appErrorFile: {
            type: 'dateFile',
            filename: appErrorLogPath,
        },
        ctxErrorFile: {
            type: 'dateFile',
            filename: ctxErrorLogPath,
        },
        appErrorFilter: {
            type: 'logLevelFilter',
            appender: 'appErrorFile',
            level: 'error',
        },
        ctxErrorFilter: {
            type: 'logLevelFilter',
            appender: 'ctxErrorFile',
            level: 'error',
        },
        console: {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: '%[[%p] %c%] - %m',
            },
        },
    },
    categories: {
        default: {
            appenders: ['console'],
            level: 'trace',
        },
        application: {
            appenders: ['console', 'appFile', 'appErrorFilter'],
            level: 'trace',
        },
        context: {
            appenders: ['console', 'ctxFile', 'ctxErrorFilter'],
            level: 'trace',
        },
    },
};
if (isProd) {
    Object.values(configuration.categories)
        .slice(1)
        .forEach(config => config.appenders.shift());
}
log4js.configure(configuration);

const helpers = {
    appLogger: log4js.getLogger('application'),
    ctxLogger: log4js.getLogger('context'),
    logger: log4js.getLogger('console'),
    clearLogs,
};

const loggerHelper = server => {
    Object.assign(server, helpers);
    Object.assign(server.context, helpers);
};

loggerHelper.helpers = helpers;

module.exports = loggerHelper;
