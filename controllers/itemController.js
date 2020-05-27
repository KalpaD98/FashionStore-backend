const Item = require('../models/item-model');
const errorThrower = require('../commons/errorHandlers/throwError');
const fs = require('fs')
const {promisify} = require('util')

const unlinkAsync = promisify(fs.unlink)

exports.getAllItems = async (req, res, next) => {
    try {
        const items = await Item.find();
        res.status(200).json({
            message: "Success",
            numberOfItems: items.length,
            items: items
        });

        if (!items)
            errorThrower('No Items Found', 404)

    } catch (err) {
        next(err)
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
            errorThrower('An Error occurred while saving the item please contact administration', 500)
        }
        res.status(201).json({
            message: 'Success',
            savedItem
        })
    } catch (err) {
        next(err)
    }
}


exports.getItem = async (req, res, next) => {
    try {
        const fetchedItem = await Item.findById(req.params.id);
        res.status(200).json({
            message: 'success',
            item: fetchedItem
        })

        if (!fetchedItem) {
            errorThrower('Item not found', 404)
        }
    } catch (err) {
        next(err)
    }
}


exports.updateItem = async (req, res, next) => {

    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        //set new image
        imagePath = url + "/public/images/" + req.file.filename;
    }

    try {
        const item = await Item.findByIdAndUpdate(req.params.id, {...req.body, imagePath}, {
            runValidators: true
        });
        await deleteImage(item.imagePath, true)

        res.status(200).json({
            message: 'success',
            item

        })
    } catch (err) {
        next(err)
    }
}

exports.deleteItem = async (req, res, next) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            errorThrower('Item not found or already been deleted', 404)
        }

        const itemId = item._id
        await deleteImage(item.imagePath)

        res.status(204).json({
            message: 'success',
            itemId
        })

    } catch (err) {
        next(err)
    }
}


const deleteImage = async (imagePath, isUpdate = false) => {

    if (isUpdate)
        imagePath = 'public/' + (imagePath).substr(22)
    else
        imagePath = (imagePath).substr(22)
    await unlinkAsync(imagePath) //delete image
}
