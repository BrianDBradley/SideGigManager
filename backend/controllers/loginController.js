const User = require('../models/userModel')
const mongoose = require('mongoose')

const login = async (req, res) => {
    const { username, password } = req.body

    // attempt to find user with username
    try {
        const user = User.findOne({ username, password }).exec()

        if(!user) {
            res.status(200).json("User Not Found")
        }

        res.status(200).json("Login Successful")

    } catch(error) {
        res.status(404).json({error: error.message})
    }

}

module.exports = login