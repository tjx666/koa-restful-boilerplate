const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const { userService } = require('../../services');
const configs = require('../../../configs');

const register = async (ctx, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        password: Joi.string()
            .max(60)
            .required(),
        age: Joi.number(),
    });
    await ctx.validateAsync(schema);

    const userDto = ctx.request.body;
    await userService.createUser(userDto);

    ctx.restify();
    await next();
};

const login = async (ctx, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        password: Joi.string()
            .max(60)
            .required(),
    });
    await ctx.validateAsync(schema);

    const { name, password } = ctx.request.body;
    const user = await userService.checkLogin(name, password);

    if (user) {
        const token = jwt.sign(
            {
                data: user,
                exp: Math.floor(Date.now() / 1000) + 6 * 60 * 60,
            },
            configs.security.jwtSecret
        );
        ctx.response.body = {
            code: 0,
            msg: 'login success!',
            data: `Bearer ${token}`,
        };
    } else {
        throw Boom.unauthorized();
    }

    await next();
};

const getUsers = async (ctx, next) => {
    const users = await userService.findAllUsers();
    ctx.restify(users);
    await next();
};

module.exports = { register, login, getUsers };
