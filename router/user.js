const express = require('express')
const router = express.Router()
const UserController = require('../controller/user')

router.post('/user/signup', UserController.signup)
router.post('/user/login', UserController.login)

module.exports = router