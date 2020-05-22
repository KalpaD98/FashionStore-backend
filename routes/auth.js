const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')
const {body} = require('express-validator');
const User = require('../models/user')


/* GET home page. */
router.post('/login', [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({min: 6}),
], authController.login);


router.put(
    '/signup',
    [
        body('email')
            .trim()
            .isEmail()
            .withMessage('Please enter a valid email')
            .custom((value, {req}) => {
                return User.findOne({email: value}).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Email already exists')
                    }
                })
            }).normalizeEmail(),
        body('password')
            .trim()
            .isLength({min: 6}),
        body('username')
            .trim()
            .isLength({min: 3}),
    ],
    authController.signup);

module.exports = router;
