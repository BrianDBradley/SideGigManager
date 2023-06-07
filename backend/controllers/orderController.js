const Order = require('../models/orderModel')
const mongoose = require('mongoose')

// get all orders
const displayCurrentOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({createdAt: -1})
        return res.status(200).json(orders)
    } 
    catch(error) {
        return res.status(400).json({error: error.message})
    }
}

// create new order
const createOrder = async (req, res) => {
    const {name, orderDate, quantity} = req.body

    try {
        const order = await Order.create({name, orderDate, quantity})
        return res.status(200).json(order)
    }
    catch(error) {
        return res.status(400).json({error: error.message})
    }
}

// Update an order
const updateOrder = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json('Order Not Found')
    }

    const order = Order.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!order){
        return res.status(400).json('Order Not Found')
    }

    return res.status(400).json("Order Updated")
}

// Delete an order
const deleteOrder = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json('Order Not Found')
    }

    const deletion = await Order.findOneAndDelete({_id: id})

    if(!deletion){
        return res.status(400).json('Order Not Found')
    }

    return res.status(400).json("Order Deleted")
}

module.exports = {
    createOrder,
    displayCurrentOrders,
    updateOrder,
    deleteOrder
}