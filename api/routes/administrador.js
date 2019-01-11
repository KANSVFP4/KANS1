'use stric'


var express = require('express');
var AdministradorController = require('../controllers/administrador');
var md_auth = require('../middleware/authenticated');

var api = express.Router(); // esto sirve para crear las rutas 
api.post('/registerAdministrador', AdministradorController.saveAdministrador);
api.post('/loginAdministrador', AdministradorController.loginAdministrador);
//api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
//pruebas


module.exports = api;// exportamos el router de express para que las routas funcionen por todo el back end