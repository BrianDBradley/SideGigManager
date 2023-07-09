const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {   
       customerName: String,
       orderDate: Date,
       userUID: String,
       totalPrice: String, 
       contents: [{
            product: String,
            quantity: String
       }]
    }
)

module.exports = mongoose.model('Order', orderSchema)