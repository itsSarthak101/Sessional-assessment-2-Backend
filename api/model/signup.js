const mongoose = require('mongoose')

const userSchema = new mongoose.Schema( {
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    newPassword: {
        type: mongoose.Schema.Types.String
    }
})

module.exports = mongoose.model('Signup', userSchema)