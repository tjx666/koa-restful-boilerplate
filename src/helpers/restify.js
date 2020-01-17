const restifyHelper = server => {
    server.context.restify = function(data = {}, status) {
        const { method } = this.request;
        this.response.body = {
            code: 0,
            msg: 'ok',
            data: method === 'DELETE' ? {} : data,
        };

        const statusMapper = {
            POST: 201,
            DELETE: 204,
        };
        if (!status) {
            status = statusMapper[method] || 200;
        }
        this.status = status;
    };
};

module.exports = restifyHelper;
