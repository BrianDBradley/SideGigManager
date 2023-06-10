const User = require('../models/userModel')
//const sessions = require('express-session')
const mongoose = require('mongoose')

const login = async (req, res) => {
    const { username, password } = req.body

    // attempt to find user with username
    try {
        const user = User.findOne({ username, password }).exec()

        if(!user) {
            res.status(200).json("User Not Found")
        }

        req.session.loggedin = true
        req.session.username = username
        res.redirect('/orders')

    } catch(error) {
        res.status(404).json({error: error.message})
    }

}

module.exports = login