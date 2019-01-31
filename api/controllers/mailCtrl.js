'use strict'
var bcrypt = require('bcrypt-nodejs');
var nodemailer = require('nodemailer');
//var Chofer = require('../models/chofer');
// email sender function
exports.sendEmail = function (req, res) {
    //console.log("MI INFORMACION >>>>>>>>>>>>>", req.body.obj);
    console.log("Estafo con el que viene"+req.body.estado);
    // Definimos el transporter
    // console.log(req.b);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'buzonkans@gmail.com',
            pass: 'tefoaguayo1'
        }
    });
    // Definimos el email
    if (req.body.estado == '0') {
        var mailOptions = {
            from: 'buzonkans@gmail.com',
            /* to: req.body.obj._id_chofer.correo,
             to: req.body.obj.receiver.correo,*/
            to: req.body.obj.emitter.correo ,
            //to: 'avalos.geovanny@hotmail.com, wolfpkmur@gmail.com',
            subject: 'Request Accepted in process',
           // text: 'VIAJE CANCELADO: El viaje del cliente ' + req.body.obj.receiver.nombre + ' ' + req.body.obj.receiver.apellido + ' en la fecha ' + req.body.obj.fech_salida + ' en el horario ' + req.body.obj.horario + ' de la ruta ' + req.body.obj.ruta + ' ha sido cancelada, por favor para más información revisa tu aplicación móvil.'
        };
        console.log('mailOptions >>>>>> ', mailOptions);
        transporter.sendMail(mailOptions, function (error) {
            if (error) {
                console.log(error);
                res.send(500, err.message);
            } else {
                console.log("Email sent");
                res.status(200).jsonp(req.body);
            }
        });
    }

    if (req.body.estado == '1') {
        console.log(req.body.obj.emitter.correo);
        var mailOptions = {
            from: 'buzonkans@gmail.com',
            to:req.body.obj.emitter.correo,
            subject: 'Request Accepted',
           text: 'The Request of New Offert was accepted in Category:'+'  ' + req.body.obj.Categoria + '  '+
            'Social Network:'+'  '+ 'Faceboock:'+'' + req.body.obj.Faceboock +'  '+ ' Instagram: ' + req.body.obj.Instagram
             +' '+ ' Twiter:'+'  ' + req.body.obj.Twiter + '  '+ ' Another red:'+'  ' + req.body.obj.OtraRed + 
             '  '+' Time:'+' '+ req.body.obj.Tiempo+ '    ' +'Price:'+req.body.obj.Precio+'  '+'Scope:'+req.body.obj.Alcance+
             ' '+'Extra Information:'+'  '+req.body.obj.Inf_extra+'       '+'Check again the pages with which you will work and the categories in which you want to participate'
        };
        transporter.sendMail(mailOptions, function (error) {
            if (error) {
                console.log(error);
                res.send(500, err.message);
            } else {
                console.log("Email sent");
                res.status(200).jsonp(req.body);
            }
        });
    }

    if (req.body.estado == '2') {
       
        var mailOptions = {
            from: 'buzonkans@gmail.com',
            to:req.body.obj.emitter.correo,
            subject: 'Request Refuse',
           text: 'The Request of New Offert was refuse in Category:'+'  ' + req.body.obj.Categoria + '  '+
            'Social Network:'+'  '+ 'Faceboock:'+'' + req.body.obj.Faceboock +'  '+ ' Instagram: ' + req.body.obj.Instagram
             +' '+ ' Twiter:'+'  ' + req.body.obj.Twiter + '  '+ ' Another red:'+'  ' + req.body.obj.OtraRed + 
             '  '+' Time:'+' '+ req.body.obj.Tiempo+ '    ' +'Price:'+req.body.obj.Precio+'  '+'Scope:'+req.body.obj.Alcance+
             ' '+'Extra Information:'+'  '+req.body.obj.Inf_extra,
        };
        transporter.sendMail(mailOptions, function (error) {
            if (error) {
                console.log(error);
                res.send(500, err.message);
            } else {
                console.log("Email sent");
                res.status(200).jsonp(req.body);
            }
        });

        

    }

    if (req.body.estado == '3') {
       console.log("pilas ya acabas",req.body.obj);
        var mailOptions = {
            from: 'buzonkans@gmail.com',
            to:req.body.obj.emitter.correo,
            subject: ' You have a new payment on paypal',
           text: 'A payment has been made to the paylpal account:'+'  ' + req.body.obj.emitter.paypal + '  '+'of the next offert:'+' '+'Category:'+req.body.obj.Categoria+
            'Social Network:'+'  '+ 'Faceboock:'+'' + req.body.obj.Faceboock +'  '+ ' Instagram: ' + req.body.obj.Instagram
             +' '+ ' Twiter:'+'  ' + req.body.obj.Twiter + '  '+ ' Another red:'+'  ' + req.body.obj.OtraRed + 
             '  '+' Time:'+' '+ req.body.obj.Tiempo+ '    ' +'Price:'+req.body.obj.Precio+'  '+'Scope:'+req.body.obj.Alcance+
             ' '+'Extra Information:'+'  '+req.body.obj.Inf_extra+'.........the payment was made by:'+req.body.obj.contratista.Nombre+''+req.body.obj.contratista.Apellido,
        };
        transporter.sendMail(mailOptions, function (error) {
            if (error) {
                console.log(error);
                res.send(500, err.message);
            } else {
                console.log("Email sent");
                res.status(200).jsonp(req.body);
            }
        });

        

    }
   
    // Enviamos el email

    /*transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });*/
   
};