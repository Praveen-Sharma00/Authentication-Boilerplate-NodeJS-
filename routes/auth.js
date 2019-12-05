const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

router
    .route('/')
    .get(authController.login)
    .post(authController.postLogin)

router
    .route('/signup')
    .get(authController.signup)
    .post(authController.postSignup)

router
    .route('/logout')
    .post(authController.logout)

module.exports = router