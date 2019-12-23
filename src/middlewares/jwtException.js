const jwtExceptionMiddleware = options => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            if (err.status === 401) {
                ctx.ctxLogger.error(err);
                ctx.response.status = 401;
                ctx.body = {
                    code: 401,
                    msg: 'please login first!',
                };
            } else {
                throw err;
            }
        }
    };
};

module.exports = jwtExceptionMiddleware;
