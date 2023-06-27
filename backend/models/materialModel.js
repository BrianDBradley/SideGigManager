const mongoose = require('mongoose')

const materialSchema = new mongoose.Schema(
    {
        name: 
        {
            type: String,
            required: true
        },
        totalCost:
        {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        userUID: String,
        costPerPart: Number
    }
)

module.exports = mongoose.model('Material', materialSchema)