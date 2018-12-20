'use stric'


var express = require('express');
var UserController= require('../controllers/user');
var md_auth = require('../middleware/authenticated');

var api = express.Router(); // esto sirve para crear las rutas 
api.post('/register',UserController.saveUser);
api.post('/login',UserController.loginUser);

//pruebas
api.get('/pruebaServicio',md_auth.ensureAuth, UserController.pruebas);

module.exports =api;// exportamos el router de express para que las routas funcionen por todo el back end