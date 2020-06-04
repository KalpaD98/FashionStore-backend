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
        enum: ['super-admin', 'admin', 'store-manager', 'user'],
        default: 'user'
    },
    verificationToken: {type: String},
    verified: {type: Boolean, default: false},
    passwordResetToken: {type: String},
    passwordResetTokenExpDate: {type: Date}
})


userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User
