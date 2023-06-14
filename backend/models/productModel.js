const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {   
       name: String,
       costToProduce: Number,
       pricePerUnit: Number
    }
)

module.exports = mongoose.model('Product', productSchema)