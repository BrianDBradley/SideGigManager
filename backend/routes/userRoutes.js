const express = require('express')
const router = express.Router()
const {
    getUserInfo,
    createUser
} = require('../controllers/userController')

// GET user info
router.get('/:id', getUserInfo)

// POST new user
router.post('/', createUser)

module.exports = router