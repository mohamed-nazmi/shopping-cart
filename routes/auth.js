const express = require('express');
const { check, body } = require('express-validator/check');
// body() will look for a specific field but it has to be in the request body

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
    '/login',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email')
            .normalizeEmail(),
        body('password', 'Password has to be valid')
            .isLength({ min: 8 })
            .isAlphanumeric()
            .trim()
    ],
    authController.postLogin
);

router.post(
    '/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email')
            .normalizeEmail()
            .custom((value, {req}) => {
                return User.findOne({ email: value })
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject('Email already exists! Please pick a different one'); 
                        }
                    })
            }),
        body(
            'password',
            'Please enter an alphanumeric password with at least 8 characters'
            // Error msg is placed here in order not to repeat it after each validator
        )
            .isLength({ min: 8 })
            .isAlphanumeric()
            .trim(),
        body('confirmPassword')
            .trim()
            .custom((value, {req}) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match!');
                }
                return true;
            })
    ],
    authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;