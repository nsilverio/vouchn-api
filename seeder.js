const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

// Load env vars
dotenv.config({ path: './config/config.env' })

// Load models
const Merchant = require('./models/Merchant')
const Company = require('./models/Company')
const User = require('./models/User')
const Account = require('./models/Account')
const AccountEntry = require('./models/AccountEntry')

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read JSON files
const merchants = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/merchants.json`, 'utf-8')
)
const companies = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/companies.json`, 'utf-8')
)
const users = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
)
const accounts = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/accounts.json`, 'utf-8')
)
const accountEntries = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/accountEntries.json`, 'utf-8')
)
// Import into DB
const importData = async () => {
    try {
        await Merchant.create(merchants)
        await Company.create(companies)
        await User.create(users)
        await Account.create(accounts)
        await AccountEntry.create(accountEntries)

        console.log('Data Imported...'.green.inverse);

        process.exit();
    } catch (err) {
        console.error(err);
    }
}

// Delete data
const deleteData = async () => {
    try {
        await Merchant.deleteMany()
        await Company.deleteMany()
        await User.deleteMany()
        await Account.deleteMany()
        await AccountEntry.deleteMany()

        console.log('Data deleted...'.red.inverse)

        process.exit()
    } catch (err) {
        console.error(err)
    }
}

if (process.argv[2] === '-i') {
    importData()
} else if (process.argv[2] === '-d') {
    deleteData()
}