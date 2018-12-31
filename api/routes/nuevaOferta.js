'use stric'


var express = require('express');
var NuevaOfertaController = require('../controllers/nuevaOferta');
var md_auth = require('../middleware/authenticated');

var api = express.Router(); // esto sirve para crear las rutas 
api.post('/saveNuevaOferta', md_auth.ensureAuth, NuevaOfertaController.saveNuevaOferta);


module.exports = api;// exportamos el router de express para que las routas funcionen por todo el back end