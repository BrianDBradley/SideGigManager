const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {   
       name: String,
       orderDate: Date,
       quantity: Number
    }
)

module.exports = mongoose.model('Order', orderSchema)