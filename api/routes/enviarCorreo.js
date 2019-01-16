'use strcit'

var express= require('express');

var EmailCtrl = require('../controllers/mailCtrl');
var api = express.Router();
//email route
api.post('/email', EmailCtrl.sendEmail);

module.exports = api; 