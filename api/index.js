'use strict'

//pago tarjetad e credito
var paypal = require('paypal-rest-sdk');


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



paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'Ad3W13uEBeorpc_97MDhfF6GFikicmeXM4Jt48GVewNs9wvUh74EG4IjIsneP305xQ971q75vNSSqFID',
    'client_secret': 'EGmPXNqBAcBOOH_f415y1L-S_bIpcL-I_B_EEv0IfEn9F4jZ5_5DSCntzTyXJy6vSoRrlVBlhLYj760O'
});

app.globalAmount = 0;
app.globalTipoPago = '';
app.globalTipoSolicitud = "";
app.post('/api/createPayment', function (req, res) {
    console.log('iquenomas viene', req.body);
    app.globalId = req.body.idViaje;
    app.globalAmount = req.body.amount;
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3977/executePayment",
            "cancel_url": "http://localhost:3977/cancelPayment"
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
                "total":  Number(req.body.amount),
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
    console.log("entre ejecurte es es el valor"+app.globalAmount);
    var payment_Id = req.query.paymentId;
    var payer_id = req.query.PayerID;
    var execute_payment_json = {
        "payer_id": payer_id,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total":  app.globalAmount 
            }
        }]
    };

    var paymentId = payment_Id;

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log("este es tu herror"+JSON.stringify(error.response));
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.send("Transaccion Completa");


            // de aqui borre el if
           


        }
    });
});

app.get('/cancelPayment', function (req, res) {
    res.send("Trannsaccion cancelada");
});
