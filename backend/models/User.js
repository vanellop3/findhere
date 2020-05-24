const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    firstName:{
        type: String
        },
    lastName:{
        type:String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    isAdmin:{
      type:Boolean,
      default: false
    }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;

