const express = require('express') 
const router = express.Router()
const { razorpay,check } = require('../controllers/razorpay')
router.post('/razorpay', razorpay)
router.get('/check',check)
module.exports=router