const mongoose = require('mongoose')

// getting "true is not a valid type at path required"
// when trying to run "required: true" in each portion of the schema
// running without requiring, come back to fix later

const userSchema = new mongoose.Schema(
    {   
        name: String,
        email: String,
        password: String
    }
)

module.exports = mongoose.model('User', userSchema)