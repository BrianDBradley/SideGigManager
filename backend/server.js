const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const orderRoutes = require('./routes/orderRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(express.json())

// FIX BEFORE POSTING TO GITHUB - ENVIRONMENT VARIABLES RETURNING UNDEFINED
// CONNECTED DIRECTLY TO ADDRESS FOR TIME BEING
mongoose.connect(process.env.MONGO_DB_URI)

app.use('/orders', orderRoutes)
app.use('/', userRoutes)

app.listen(4000, () => {
    console.log("Listening")
})