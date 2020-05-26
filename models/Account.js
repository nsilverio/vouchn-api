const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const AccountSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    accountBalance: Number,
    creditBalance: Number,
    debitBalance: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)
AccountSchema.virtual('entries', {
    ref: 'AccountEntry',
    localField: '_id',
    foreignField: 'account',
    justOne: false
})



// cascade delete account entried when an account is deleted
AccountSchema.pre('remove', async function (next) {

    await this.model('AccountEntry').deleteMany({ account: this._id })

    console.log(`Account entried being removed from account ${this._id}`)

    next()
})


module.exports = mongoose.model('Account', AccountSchema);
