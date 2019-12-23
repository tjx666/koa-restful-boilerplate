const { argv } = require('yargs');

const env = argv.env || process.env.NODE_ENV || 'production';
const isProd = !['development', 'test'].includes(env);

module.exports = {
    env,
    isProd,
};
