'use strict'

//pago tarjetad e credito
//var paypal = require('paypal-rest-sdk');

// coenxion base
var mongoose = require('mongoose');
var app = require('./appi');
var port = process.env.PORT || 3977;

//var Viaje = require('./models/viaje');



mongoose.connect('mongodb://localhost:27017/kansdb', (err, res) => {
    if (err) {
        throw err;

    } else {
        console.log("base de datos esta corriendo correctamente");

      app.listen(port, function () {
            console.log("servidor del api rest de mucsica ecuchando por el puerto", port);
        });
    }

});