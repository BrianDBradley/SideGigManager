const { Decimal128 } = require('mongodb')
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {   
       name:
       {
            type: String,
            required: true
       },
       costToProduce:
       {
            type: String,
            required: true,
       },
       userUID: String,
       pricePerUnit: String
    }
)

module.exports = mongoose.model('Product', productSchema)