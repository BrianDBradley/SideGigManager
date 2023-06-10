const mongoose = require('mongoose')

const materialSchema = new mongoose.Schema(
    {
        totalCost:
        {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        costPerPart: Number
    }
)

module.exports = mongoose.model('Material', materialSchema)