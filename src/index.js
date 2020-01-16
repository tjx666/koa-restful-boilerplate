//     __                  ____  _____________________      __   __          _ __                __      __
//    / /______  ____ _   / __ \/ ____/ ___/_  __/ __/_  __/ /  / /_  ____  (_) /__  _________  / /___ _/ /____
//   / //_/ __ \/ __ `/  / /_/ / __/  \__ \ / / / /_/ / / / /  / __ \/ __ \/ / / _ \/ ___/ __ \/ / __ `/ __/ _ \
//  / ,< / /_/ / /_/ /  / _, _/ /___ ___/ // / / __/ /_/ / /  / /_/ / /_/ / / /  __/ /  / /_/ / / /_/ / /_/  __/
// /_/|_|\____/\__,_/  /_/ |_/_____//____//_/ /_/  \__,_/_/  /_.___/\____/_/_/\___/_/  / .___/_/\__,_/\__/\___/
//                                                                                    /_/

const { promisify } = require('util');
const chalk = require('chalk');
const logSymbols = require('log-symbols');

const loggerHelpers = require('./helpers/logger');
const bootstrap = require('./bootstrap');
const { env: mode } = require('../utils/env');
const config = require('../configs');

const { appLogger } = loggerHelpers.helpers;

const start = async () => {
    appLogger.info(`Startup server under ${chalk.bold.yellow(mode.toUpperCase())} mode`);

    const app = await bootstrap();
    const { hostname, port, address } = config.server;
    const server = await promisify(cb => {
        const httServer = app.listen(port, hostname, err => cb(err, httServer));
    })();

    app.appLogger.info(`Server is running at ${chalk.green.underline(address)} ${logSymbols.success}`);

    return {
        app,
        server,
    };
};

process.on('unhandledRejection', err => {
    appLogger.error(err);
});

if (mode !== 'test') {
    start();
} else {
    module.exports = start;
}
