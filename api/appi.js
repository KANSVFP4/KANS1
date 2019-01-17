'Use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
//Notificaciones




//cargar Rutas
var user_routes = require('./routes/user');
var nuevaOferta_routes = require('./routes/nuevaOferta');
var administrador_rutes = require('./routes/administrador');
var email = require('./routes/enviarCorreo');
//var paypal =require('./routes/paypal');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //convertir a json als peticiones

//configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

// rutas base
app.use('/api', user_routes);
app.use('/api', nuevaOferta_routes);
app.use('/api', administrador_rutes);
app.use('/api',email);


//app.use('/api',paypal);

module.exports = app; // hace referencia a la variable de express

