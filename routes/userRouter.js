const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const {body} = require('express-validator');
const User = require('../models/user-model');

const router = express.Router();

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

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

router
    .route('/:id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser)

router.post('/reset-password-email',
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
    authController.postResetPasswordEmail)


router.post('/reset-password',
    body('password')
        .trim()
        .isLength({min: 6}),
    authController.postResetPassword)


router.post('/email-verification', authController.postEmailVerification)

module.exports = router;
