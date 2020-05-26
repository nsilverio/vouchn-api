const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const AccountEntrySchema = new mongoose.Schema({
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
    account: {
        type: mongoose.Schema.ObjectId,
        ref: 'Account',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: [
            'credit',
            'debit',
        ],
    },
    merchant: {
        type: mongoose.Schema.ObjectId,
        ref: 'Merchant'
    },
    code: {
        type: String
    },
    hideFromWallet: {
        type: Boolean,
        default: false
    },
    amount: {
        type: Number,
        required: [true, 'Please add an amount']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expireAt: {
        type: Date,
        default: Date.now
    },
})

// Static method to get account balance
AccountEntrySchema.statics.getAccountBalance = async function (accountId) {
    console.log('Calculating credit balance'.blue)

    const obj = await this.aggregate([
        {
            $match: {
                account: accountId,

            }
        },
        {
            $group: {
                _id: { "id": "$user" },
                creditBalance: {
                    "$sum": { "$cond": [{ "$eq": ["$type", "credit"] }, "$amount", 0] }
                },
                debitBalance: {
                    "$sum": { "$cond": [{ "$eq": ["$type", "debit"] }, "$amount", 0] }
                }
            }
        },
        {
            $addFields: {
                accountBalance: { $subtract: ["$creditBalance", "$debitBalance"] }
            }
        }


    ])

    try {
        await this.model('Account').findByIdAndUpdate(
            accountId,
            obj[0]
                ? {
                    creditBalance: Math.round((obj[0].creditBalance + Number.EPSILON) * 100) / 100,
                    debitBalance: Math.round((obj[0].debitBalance + Number.EPSILON) * 100) / 100,
                    accountBalance: Math.round((obj[0].accountBalance + Number.EPSILON) * 100) / 100,
                }
                : {
                    creditBalance: undefined,
                    debitBalance: undefined,
                    accountBalance: undefined
                }
        );


    } catch (err) {
        console.error(err);
    }

}

// Call account balance after save
AccountEntrySchema.post('save', async function () {
    await this.constructor.getAccountBalance(this.account)

})

// Call account balance after remove
AccountEntrySchema.post('remove', async function () {
    await this.constructor.getAccountBalance(this.account)

})

module.exports = mongoose.model('AccountEntry', AccountEntrySchema);
