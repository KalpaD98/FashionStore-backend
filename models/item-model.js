const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({

    itemName: {
        type: String,
        required: [true, 'An item must have a name']
    },
    category: {
        type: String,
        enum: ['Ladies', 'Gents', 'Unisex', 'Teenage-Boys', 'Teenage-Girls', 'Boys', 'Girls', 'Babies', 'Other'],
        required: [true, 'An item must have a category']
    },
    itemType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'An item must have a price'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'An item must have a description']
    },
    itemPhotos: {
        type: String,
        default: "default-img.jpg"
    },
    country: {
        type: String
    },
    itemQuantity: {
        type: Number,
        required: true
    },
    averageRating: {
        type: Number,
        min: [0, 'A rate cannot be lesser than 0'],
        max: [5, 'A rate cannot be greater than 5'],
        default: 4.0
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
