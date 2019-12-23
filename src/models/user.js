const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        name: String,
        password: {
            type: String,
            maxlength: 60,
        },
        age: Number,
    },
    { timestamps: true }
);

module.exports = model('User', UserSchema);
