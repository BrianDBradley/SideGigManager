const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
require('dotenv').config()

const orderRoutes = require('./routes/orderRoutes')
const userRoutes = require('./routes/userRoutes')
const loginRoutes = require('./routes/loginRoutes')
const materialRoutes = require('./routes/materialRoutes')

const app = express()
app.use(session({
	secret: 'SuperDuperSecretJamesBondStyleKeyAhhhhhhhh',
	resave: true,
	saveUninitialized: false,
    cookie: {
        sameSite: 'strict'
    }
}))
app.use(express.json()) 

// connect to DB
mongoose.connect(process.env.MONGO_DB_URI)

// use 
app.use('/materials', materialRoutes)
app.use('/login', loginRoutes)
app.use('/orders', orderRoutes)
app.use('/', userRoutes)

//test

// listen for requests, port 4000, display "Listening" to console to show app
// launch successfully
app.listen(4000, () => {
    console.log("Listening")
})