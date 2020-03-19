module.exports = function restifyHelper(app) {
    app.context.restify = function(data = {}, msg = 'success', status) {
        const { method } = this.request;
        this.response.body = {
            code: 0,
            msg,
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
