'use strict'

var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

var NuevaOferta = require('./models/nuevaOferta'); //importar el modelo del usuario  o lo que son las clases comunes

//pago tarjetad e credito
var paypal = require('paypal-rest-sdk');


// coenxion base
var mongoose = require('mongoose');
var app = require('./appi');
var port = process.env.PORT || 3977;

var Oferta = require('./models/nuevaOferta');

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



paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'Ad3W13uEBeorpc_97MDhfF6GFikicmeXM4Jt48GVewNs9wvUh74EG4IjIsneP305xQ971q75vNSSqFID',
    'client_secret': 'EGmPXNqBAcBOOH_f415y1L-S_bIpcL-I_B_EEv0IfEn9F4jZ5_5DSCntzTyXJy6vSoRrlVBlhLYj760O'
});

app.globalAmount = 0;
app.globalTipoPago = '';
app.globalTipoSolicitud = "";
app.globalNuevaOferta="";



app.post('/api/createPayment', function (req, res) {
    app.nuevaOferta = new NuevaOferta();
    app.globalNuevaOferta=req.body.todo;
    console.log('iquenomas viene', req.body.todo);
    app.globalCorreoEmitter = req.body.todo.emitter.correo;
    app.Idcontratista = req.body.contratista._id;
    app.globalId = req.body.idViaje;
    app.globalAmount = req.body.amount;
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://142.93.201.26:3977/executePayment",
            "cancel_url": "http://142.93.201.26:3977/cancelPayment"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": Number(req.body.amount),
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": Number(req.body.amount),
            },
            "description": "This is the payment description."
        }]
    };


    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            res.send(payment);
        }
    });
});



app.get('/executePayment', function (req, res) {
    console.log("entre ejecurte es es el valor" + app.globalAmount);

    var payment_Id = req.query.paymentId;
    var payer_id = req.query.PayerID;
    var execute_payment_json = {
        "payer_id": payer_id,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": app.globalAmount
            }
        }]
    };

    var paymentId = payment_Id;

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log("este es tu herror" + JSON.stringify(error.response));
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            // res.send("Transaccion Completa");



            // de aqui borre el if
            console.log("ide de contratis", app.Idcontratista);
            console.log("ide de l aoferta" + app.globalId);



            // aqui hay que crear en ves de modificar

          // nuevaOferta = new NuevaOferta();
           //var params = req.body;
           // console.log("LO QUE VIENE" + req.user.sub);
         
            app.nuevaOferta.Links_to_work = app.globalNuevaOferta.Links_to_work;
            //solicitudEncomienda.estado = params.estado;
            app.nuevaOferta.emitter = app.globalNuevaOferta.emitter._id;
            app.nuevaOferta.Categoria = app.globalNuevaOferta.Categoria;
            app.nuevaOferta.OtraCategoria = app.globalNuevaOferta.OtraCategoria;
            app.nuevaOferta.Faceboock = app.globalNuevaOferta.Faceboock;
            app.nuevaOferta.Instagram = app.globalNuevaOferta.Instagram;
            app.nuevaOferta.Twiter = app.globalNuevaOferta.Twiter;
            app.nuevaOferta.OtraRed = app.globalNuevaOferta.OtraRed;
            app.nuevaOferta.Tiempo = app.globalNuevaOferta.Tiempo;
            app.nuevaOferta.Precio = app.globalNuevaOferta.Precio;
            app.nuevaOferta.Alcance = app.globalNuevaOferta.Alcance;
            app.nuevaOferta.Inf_extra = app.globalNuevaOferta.Inf_extra;
            app.nuevaOferta.estado = 10;
            app.nuevaOferta.estadoPago=0;
            app.nuevaOferta.contratista=app.Idcontratista;



          

            app.nuevaOferta.save((err, nuevaOfertaStored) => {
                if (err) {
                    return res.status(500).send({ message: 'Error al crear la oferta' });

                }

                if (!nuevaOfertaStored) {
                    return res.status(200).send({ message: 'No se ha podido realizar la creacion de la nueva oferta' });
                }
                //console.log("message guardado" + solicitudEncomiendaStored);
                res.status(200).send("Completed Transaction..." + "Now you have to send all the information to advertise to the next mail:<h3>" + app.globalCorreoEmitter + "</h3>" + "<br>Close this window to continue..</br>");
            });

        }
    });
});

app.get('/cancelPayment', function (req, res) {
    res.send("Trannsaccion cancelada");
});
