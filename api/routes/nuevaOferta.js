'use stric'


var express = require('express');
var NuevaOfertaController = require('../controllers/nuevaOferta');
var md_auth = require('../middleware/authenticated');

var api = express.Router(); // esto sirve para crear las rutas 
api.post('/saveNuevaOferta',md_auth.ensureAuth,NuevaOfertaController.saveNuevaOferta);
api.get('/nuevasOfertas/:estado', md_auth.ensureAuth, NuevaOfertaController.getAllNuevasOfertas);
api.get('/ofertasPorPagar/:estado', md_auth.ensureAuth, NuevaOfertaController.getAllOfertasPorPagar);
api.get('/MynuevasOfertas', md_auth.ensureAuth, NuevaOfertaController.getMyOfertas);
api.get('/MyOfertasPendientes', md_auth.ensureAuth, NuevaOfertaController.getMyOfertasPendientes);
api.get('/MyOfertasRealizadas', md_auth.ensureAuth, NuevaOfertaController.getMyOfertasRealizadas);
api.get('/OfertasPagadas', md_auth.ensureAuth, NuevaOfertaController.getOfertasPagadas);
api.get('/MyOfertasPerfil/:id', md_auth.ensureAuth, NuevaOfertaController.getOfertasPerfil);
api.get('/OfertasPagadasFecha/:fecha', md_auth.ensureAuth, NuevaOfertaController.getOfertasPagadasFecha);
api.get('/AllOfertasPendientes', md_auth.ensureAuth, NuevaOfertaController.getAllOfertasPendientes);
api.get('/MyOfertasPendientesPublicista', md_auth.ensureAuth, NuevaOfertaController.getMyOfertasPendientesPublicista);
api.put('/update-oferta/:id',md_auth.ensureAuth,NuevaOfertaController.updateOferta);
api.put('/ofertaCumplida/:id',md_auth.ensureAuth,NuevaOfertaController.ofertaCumplida);
api.put('/ofertaPagada/:id',md_auth.ensureAuth,NuevaOfertaController.ofertaPagada);



module.exports = api;// exportamos el router de express para que las routas funcionen por todo el back end