const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    ,
    username: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'store-manager', 'user'],
        default: 'user'
    }
})


userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User
