const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db')

// Load env vars 
dotenv.config({ path: './config/config.env' })

// Initialize express instance
const app = express()

// Define port
const PORT = process.env.PORT || 8000

// Connect to database
connectDB();


// Route files 
const accounts = require('./routes/accounts')
const redeems = require('./routes/redeems')

// Mount router
app.use('/api/v1/accounts', accounts)
app.use('/api/v1/redeems', redeems)

const server = app.listen(PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)


// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`unhandledRejection Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1))
})
