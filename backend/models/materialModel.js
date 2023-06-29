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
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        },
        userUID: String,
        costPerPart: String
    }
)

module.exports = mongoose.model('Material', materialSchema)