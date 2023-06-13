const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {   
       name: String,
       pricePerUnit: Number
    }
)

module.exports = mongoose.model('Product', productSchema)