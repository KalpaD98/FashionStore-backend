const Item = require('../models/item-model');
const errorThrower = require('../commons/errorHandlers/throwError');

exports.getAllItems = async (req, res, next) => {
    try {
        const items = await Item.find();
        res.status(200).json({
            status: 'success',
            results: items.length,
            data: {
                items: items
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'No items found'
        });
    }
}


exports.createItem = async (req, res, next) => {
    try {
        const url = req.protocol + "://" + req.get('host');
        const item = new Item(
            {
                title: req.body.title,
                category: req.body.category,
                type: req.body.type,
                price: req.body.price,
                description: req.body.description,
                imagePath: url + "/public/images/" + req.file.filename,
                quantity: req.body.quantity,
                creator: req.userId,
            }
        );

        const savedItem = await item.save();
        if (!savedItem) {
            errorThrower('An Error occurred while saving the item please contact administration',500)
        }
        res.status(201).json({
            message: 'successfully created item',
            savedItem
        })
    } catch (err) {
        next(err)
    }
}


exports.getItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                item
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'No item found with that id'
        });
    }
}


exports.updateItem = async (req, res, next) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true
        });
        res.status(201).json({
            status: 'success',
            body: {
                item: item
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.deleteItem = async (req, res, next) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: {
                data: null
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
}
