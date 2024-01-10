const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    todos: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Todo',
        },
    ],
});

const User = new mongoose.model('User', userSchema);
module.exports = User;
