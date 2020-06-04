const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'An item must have a name']
    },
    category: {
        type: String,
        enum: ['Women', 'Men', 'Unisex', 'Kids', 'Sports', 'Babies', 'Other'],
        required: [true, 'An item must have a category']
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'An item must have a price'],
        default: 0.0
    },
    size: {
        type: String,
        enum: ['XXL','XXL','XL','L','M','S','XS','XXS'],
        required: [true,'An item must have a Size']
    },
    description: {
        type: String,
        required: [true, 'An item must have a description']
    },
    imagePath: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    averageRating: {
        type: Number,
        min: [0, 'A rate cannot be lesser than 0'],
        max: [5, 'A rate cannot be greater than 5'],
        default: null
    },
    numberOfRatings: {
        type: Number,
        default: 0
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

});


const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
