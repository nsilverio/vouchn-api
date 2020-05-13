const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')

// Load env vars 
dotenv.config({ path: './config/config.env' })

// Initialize express instance
const app = express()

const PORT = process.env.PORT || 8000

const server = app.listen(PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)

