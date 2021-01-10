const express = require('express')
const router = express.Router()
const PaymentController = require('../controller/payment')

router.get('/store', PaymentController.getItems)

router.post('/purchase', PaymentController.purchase)

module.exports = router