const User = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const login = async (req, res) => {
    const { username, password } = req.body

    // attempt to find user with username
    try {
        const user = await User.findOne({ username }).exec()

        if(!user) {
            res.status(200).json("User Not Found")
        }

        bcrypt.compare(password, user.password, (err, data) => {
            if(err) throw err

            if(data) {
                const { userUid } = user.userUid

                req.session.authorized = true
                req.session.uniqueID = userUid
                res.redirect('/orders')
            }
            else {
                res.status(404).json("Invalid Login")
            }
        })

    } catch(error) {
        res.status(404).json({error: error.message})
    }

}

module.exports = login