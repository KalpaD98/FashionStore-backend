const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')
const {body} = require('express-validator');
const User = require('../models/user')


/* GET home page. */
router.post('/login', authController.login);


router.post(
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
        body('name')
            .trim()
            .isLength({min: 3}),
    ],
    authController.signup);

module.exports = router;
