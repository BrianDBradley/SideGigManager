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
            type: Decimal128,
            required: true,
       },
       userUID: String,
       pricePerUnit: Decimal128
    }
)

module.exports = mongoose.model('Product', productSchema)