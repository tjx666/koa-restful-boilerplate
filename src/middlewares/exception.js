const exceptionMiddleware = ({ apiPrefix = '/api/' } = {}) => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            if (ctx.request.url.startsWith(apiPrefix)) {
                ctx.ctxLogger.error(err);
                const {
                    code,
                    msg,
                    message,
                    status,
                    statusCode,
                    output,
                    data,
                } = err;
                if (err.isBoom) {
                    ctx.response.status = output.statusCode || 500;
                    ctx.response.body = {
                        code: (data && data.code) || ctx.response.status,
                        msg:
                            (data && data.msg) ||
                            message ||
                            output.payload.message ||
                            output.payload.error,
                    };
                } else {
                    ctx.response.status = status || statusCode || 500;
                    ctx.response.body = {
                        code: code || ctx.response.status,
                        msg:
                            msg ||
                            message ||
                            'An internal server error occurred',
                    };
                }
            } else {
                throw err;
            }
        }
    };
};

module.exports = exceptionMiddleware;
