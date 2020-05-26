const express = require('express');
const itemController = require('../controllers/itemController');
const isAuth = require("../middleware/is-auth");
const isHigherRole = require('../middleware/role-validators/is-higher-role')

const extractFile = require("../middleware/file");

const router = express.Router();

router.route('/')
    .get(itemController.getAllItems)
    .post(isAuth, isHigherRole, extractFile, itemController.createItem)

router.route('/:id')
    .get(itemController.getItem)
    .put(isAuth, isHigherRole, extractFile, itemController.updateItem)
    .delete(itemController.deleteItem)

module.exports = router;
