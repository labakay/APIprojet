const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    lastName: {
        type: String
    },
    telephone: {
        type: Number
    },
    adresse: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    isAdmin: {
        type: Boolean
    }
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);