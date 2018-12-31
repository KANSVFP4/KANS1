'use strcit'

var bcrypt = require('bcrypt-nodejs');

var NuevaOferta = require('../models/nuevaOferta'); //importar el modelo del usuario  o lo que son las clases comunes
var jwt = require('../services/jwt');
var path = require('path');
var fs = require('fs');

function saveNuevaOferta(req, res) {


    nuevaOferta = new NuevaOferta();
    // console.log("Estoy guardadno mensjae");
     var params = req.body;
    console.log("LO QUE VIENE"+req.user.sub);
     /*if (!params.identity) {
         console.log("entre dentro con identity");
         return res.status(200).send({ message: 'Envie todos los datos necesarios' });
     }*/

     

 
     nuevaOferta.Links_to_work = params.Links_to_work;
     //solicitudEncomienda.estado = params.estado;
     nuevaOferta.emitter=req.user.sub;
     nuevaOferta.Categoria = params.Categoria;
     nuevaOferta.OtraCategoria = params.OtraCategoria;
     nuevaOferta.Faceboock = params.Faceboock;
     nuevaOferta.Instagram = params.Instagram;
     nuevaOferta.Twiter = params.Twiter;
     nuevaOferta.OtraRed = params.OtraRed;
     nuevaOferta.Tiempo = params.Tiempo;
     nuevaOferta.Precio=params.Precio;
     nuevaOferta.Alcance = params.Alcance;
     nuevaOferta.Inf_extra = params.Inf_extra;
 
     console.log("encominda" + nuevaOferta);
 
     nuevaOferta.save((err, nuevaOfertaStored) => {
         if (err) {
             return res.status(500).send({ message: 'Error al crear la oferta' }); 
 
         }
 
         if (!nuevaOfertaStored) {
             return res.status(200).send({ message: 'No se ha podido realizar la creacion de la nueva oferta' });
         }
         //console.log("message guardado" + solicitudEncomiendaStored);
         return res.status(200).send({ nuevaOferta: nuevaOfertaStored });
     });
 
 }



 function getAllNuevasOfertas(req, res) {
    //console.log("estoy trayedo mensajes");
    //var userId = req.user.sub;
  
   // var message = Viaje.find({ '$and': [ {'$or':[{ estado:0 },{estado:1}]},{
      //receiver: userId

      var message =NuevaOferta.find().populate({ path: 'emitter'}).exec((err, messagess) => {
      if (err) {
        return res.status(500).send({
            message: 'No se ha podido obtener las ultimas ofertas'
        });
      }
  
      if (!messagess) {
        return res.status(200).send({
          message: 'No tiene ofertas'
        });
      }
  
      return res.status(200).send({
        messagess
      });
    });
  }
 
 module.exports = { // para exportar todas las funcoones 

    saveNuevaOferta,
    getAllNuevasOfertas
   
    
};