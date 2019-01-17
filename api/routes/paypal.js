'use strcit'

var express= require('express');

var paypal = require('../controllers/paypal');
var api = express.Router();
//email route
api.post('/createPayment', paypal.payment);

module.exports = api; 