const Boom = require('@hapi/boom');

const validate = async function(
    schema,
    validateQuery = false,
    isAsync = false
) {
    const ctx = this;
    const { method, query, body } = ctx.request;
    const validatedData = method === 'GET' || validateQuery ? query : body;

    let result;
    if (isAsync) {
        try {
            result = await schema.validateAsync(validatedData);
        } catch (error) {
            throw Boom.badRequest(error.details[0].message);
        }
    } else {
        result = schema.validate();
        if (result.error) {
            throw Boom.badRequest(result.error.details.message);
        }
    }

    return validatedData;
};

const validateAsync = function async(schema, validateQuery) {
    return validate.call(this, schema, validateQuery, true);
};

const validateHelper = async server =>
    Object.assign(server.context, { validate, validateAsync });

module.exports = validateHelper;
