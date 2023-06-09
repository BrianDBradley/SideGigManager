const Order = require('../models/orderModel')
const mongoose = require('mongoose')

// get all orders
const displayCurrentOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({createdAt: -1}).exec()
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
        const order = await Order.create({name, orderDate, quantity}).exec()
        return res.status(200).json(order)
    }
    catch(error) {
        return res.status(400).json({error: error.message})
    }
}

// Update an order
const updateOrder = async (req, res) => {
    const { id } = req.params

    await Order.findOneAndUpdate({_id: id}, {...req.body}, {new: true}).exec()
        .then((docs)=>{
        console.log("Result :", docs);
     })
    .catch((err)=>{
        console.log(err);
    })

    res.status(200).json("Update got")
}

// Delete an order
const deleteOrder = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json('Order Not Found')
    }

    const deletion = await Order.findOneAndDelete({_id: id}).exec()

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