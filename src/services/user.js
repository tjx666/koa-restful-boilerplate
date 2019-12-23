const bcrypt = require('bcrypt');
const { User } = require('../models');
const configs = require('../../configs');

const defaultHideFields = '-_id -__v';

const createUser = async userDto => {
    const hashedPassword = await bcrypt.hash(
        userDto.password,
        configs.security.passwordHashSaltRounds
    );
    const newUser = new User({ ...userDto, password: hashedPassword });

    await newUser.save();
};

const findOne = async (conditions, projection) => {
    return User.findOne(conditions, projection || defaultHideFields);
};

const findAllUsers = async projection => {
    return User.find({}, projection || defaultHideFields);
};

const checkLogin = async (name, password) => {
    const user = await findOne({ name });

    if (user && (await bcrypt.compare(password, user.password))) {
        return user;
    }

    return false;
};

module.exports = {
    findOne,
    createUser,
    findAllUsers,
    checkLogin,
};
