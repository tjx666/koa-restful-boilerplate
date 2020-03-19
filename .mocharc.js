const configs = {
    recursive: true,
    require: ['intelli-espower-loader'],
    exit: true,
    timeout: 3 * 1000,
    colors: true,
};

if (process.env.VSCODE_DEBUG === '1') {
    delete configs.require;
}

module.exports = configs;
