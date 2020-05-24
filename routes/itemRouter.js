const express = require('express');
const itemController = require('../controllers/itemController');
const isAuth = require("../middleware/is-auth");

const extractFile = require("../middleware/file");

const router = express.Router();

router
    .route('/')
    .get(itemController.getAllItems)
    .post(isAuth, extractFile, itemController.createItem)

router
    .route('/:id')
    .get(itemController.getItem)
    .put(isAuth, extractFile, itemController.updateItem)
    .delete(isAuth, itemController.deleteItem)

module.exports = router;
