const User = require('../models/userModel')
const mongoose = require('mongoose')

// Create (POST) new user
const createUser = async (req, res) => {
    const {name, email} = req.body

    try {
        const user = await User.create({name, email})
        return res.status(200).json(user)
    }
    catch(error) {
        return res.status(400).json({error: error.message})
    }
}

// GET user info
const getUserInfo = async (req, res) => {
    const userID = req.params

    try {
        const user = User.findById(userID)
        res.status(200).json(user)
    } 
    catch(error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    createUser,
    getUserInfo
}