/* eslint-disable new-cap */

const Koa = require('koa');
const responseTime = require('koa-response-time');
const requestLogger = require('koa-logger');
const helmet = require('koa-helmet');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');
const Boom = require('@hapi/boom');

const loggerHelpers = require('./helpers/logger');
const dbHelper = require('./helpers/db');
const restifyHelper = require('./helpers/restify');
const validateHelper = require('./helpers/validate');

const exceptionMiddleware = require('./middlewares/exception');
const jwtExceptionMiddleware = require('./middlewares/jwtException');

const router = require('./controllers/v1');

const { env } = require('../utils/env');
const config = require('../configs');

const bootstrap = async () => {
    const app = new Koa();

    await loggerHelpers(app);
    await dbHelper(app);
    await restifyHelper(app);
    await validateHelper(app);

    app.use(responseTime());
    env === 'development' && app.use(requestLogger());
    app.use(helmet());
    app.use(cors());
    app.use(bodyParser());
    app.use(exceptionMiddleware());
    app.use(jwtExceptionMiddleware());
    app.use(
        jwt({ secret: config.security.jwtSecret }).unless({
            path: [/\/api\/v\d\/users\/register/, /\/api\/v\d\/users\/login/],
        })
    );
    app.use(router.routes());
    app.use(
        router.allowedMethods({
            throw: true,
            notImplemented: () => new Boom.notImplemented(),
            methodNotAllowed: () => new Boom.methodNotAllowed(),
        })
    );

    return app;
};

module.exports = bootstrap;
