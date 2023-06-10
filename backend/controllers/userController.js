const User = require('../models/userModel')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

// Create (POST) new user
const createUser = async (req, res) => {
    // deconstruct body
    const { username, password } = req.body

    try {
        // attempt to create user and respond with body if successful
        // add uuid to user, this will be used to track which orders and 
        // materials belong to which users
        const userUid = uuidv4()
        const user = await User.create({ username, password, userUid })
        return res.status(200).json(user)
    }
    catch(error) {
        // display error
        return res.status(400).json({error: error.message})
    }
}

// GET user info
const getUserInfo = async (req, res) => {
    // receive userID from request paramters
    const { id } = req.params

    try {
        // search for and display user info
        const user = await User.findOne(id).exec()
        if(!User) {
            res.status(404).json("No User Found")
        }
        res.status(200).json(user)
    } 
    catch(error) {
        // display error
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    createUser,
    getUserInfo
}