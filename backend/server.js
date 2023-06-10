const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const orderRoutes = require('./routes/orderRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(express.json())

// connect to DB
mongoose.connect(process.env.MONGO_DB_URI)

// use routes
app.use('/orders', orderRoutes)
app.use('/', userRoutes)

//test

// listen for requests, port 4000, display "Listening" to console to show app
// launch successfully
app.listen(4000, () => {
    console.log("Listening")
})