const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "http://placekitten.com/200/300"
    },
    about: {
        type: String,
        default: "I am shit."
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;