
const express = require('express')
const router = express.Router()
const UserController = require('../controller/user')
const helper = require('../controller/helper')

router.post('/user/signup', UserController.signup)
router.post('/user/login', UserController.login)

router.get('/user/loggedin', helper.authenticateToken, UserController.getUserinfo)

router.delete('/user/logout', UserController.logout)

module.exports = router