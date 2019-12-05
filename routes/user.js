const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')
const authenticate = require('../middlewares/auth')
router
    .route('/profile')
    .get(authenticate,userController.profile)

module.exports = router