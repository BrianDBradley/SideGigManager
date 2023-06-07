const express = require('express')
const router = express.Router()
const {
    createOrder,
    displayCurrentOrders,
    updateOrder,
    deleteOrder
} = require('../controllers/orderController')


// GET all orders page
router.get('/', displayCurrentOrders)

// POST new orders
router.post('/', createOrder)

// UPDATE an order
router.patch('/:id', updateOrder)

// DELTE an order
router.delete('/:id', deleteOrder)

module.exports = router