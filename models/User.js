const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    role: {
        type: String,
        enum: ['user', 'administrator'],
        default: 'user'
    },
    company: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
        required: true
    },
    account: {
        type: mongoose.Schema.ObjectId,
        ref: 'Account'
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must have at least 6 characteres'],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    photo: {
        type: String,
        default: 'user-no-photo.png'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema);
