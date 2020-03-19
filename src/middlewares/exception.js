module.exports = function exceptionMiddleware() {
    return async (ctx, next) => {
        try {
            await next();
        } catch (error) {
            ctx.ctxLogger.error(error);

            if (error.status === 401) {
                // JWT 认证失败
                ctx.response.status = 401;
                ctx.body = {
                    code: 1,
                    msg: 'please login first!',
                };
            } else if (error.isBoom) {
                ctx.response.status = error.output.statusCode || 500;
                ctx.response.body = {
                    code: (error.data && error.data.code) || 1,
                    msg:
                        (error.data && error.data.msg) ||
                        error.message ||
                        error.output.payload.message ||
                        error.output.payload.error,
                };
            } else {
                ctx.response.status = error.status || error.statusCode || 500;
                ctx.response.body = {
                    code: error.code || 1,
                    msg: error.msg || error.message || 'An internal server error occurred',
                };
            }
        }
    };
};
