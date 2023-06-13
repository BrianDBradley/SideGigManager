const express = require('express')
const session = require('express-session')
const mongoStore = require('connect-mongodb-session')(session)
const mongoose = require('mongoose')
require('dotenv').config()

const orderRoutes = require('./routes/orderRoutes')
const userRoutes = require('./routes/userRoutes')
const loginRoutes = require('./routes/loginRoutes')
const materialRoutes = require('./routes/materialRoutes')

const logout = require('./controllers/logoutController')

const app = express()

const store = new mongoStore({
    uri: process.env.MONGO_DB_URI,
    collection: 'sessions'
})

app.use(session({
	secret: 'SuperDuperSecretJamesBondStyleKeyAhhhhhhhh',
	resave: true,
	saveUninitialized: false,
    cookie: {
        sameSite: 'strict'
    },
    store: store
}))
app.use(express.json()) 

// connect to DB
mongoose.connect(process.env.MONGO_DB_URI)

// use
app.use('/logout', logout)
app.use('/materials', materialRoutes)
app.use('/login', loginRoutes)
app.use('/orders', orderRoutes)
app.use('/', userRoutes)

// listen for requests, port 4000, display "Listening" to console to show app
// launch successfully
app.listen(4000, () => {
    console.log("Listening")
})