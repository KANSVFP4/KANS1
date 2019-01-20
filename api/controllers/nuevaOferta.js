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
     nuevaOferta.estado=0;
 
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
      var estado = req.params.estado;
      var message =NuevaOferta.find({ estado: estado }).populate({ path: 'emitter'}).exec((err, messagess) => {
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
 

  function getAllOfertasPorPagar(req, res) {
    //console.log("estoy trayedo mensajes");
    //var userId = req.user.sub;
  
   // var message = Viaje.find({ '$and': [ {'$or':[{ estado:0 },{estado:1}]},{
      //receiver: userId
      var estado = req.params.estado;
      var message =NuevaOferta.find({ estadoPago: estado }).populate({ path: 'emitter'}).exec((err, messagess) => {
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
 
  function getMyOfertas(req, res) {
    //console.log("estoy trayedo mensajes");
    var userId = req.user.sub;
      console.log(userId);
   // var message = Viaje.find({ '$and': [ {'$or':[{ estado:0 },{estado:1}]},{
      //receiver: userId

      var message =NuevaOferta.find({'$and':[{'$or':[{ estado:0 },{estado:1},{estado:2}]},{emitter: userId}]},(err, messagess) => {
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


  function getMyOfertasPendientes(req, res) {
    //console.log("estoy trayedo mensajes");
    var userId = req.user.sub;
      console.log(userId);
   // var message = Viaje.find({ '$and': [ {'$or':[{ estado:0 },{estado:1}]},{
      //receiver: userId

      var message =NuevaOferta.find({'$and':[{'$or':[{ estadoPago:0 }]},{contratista: userId}]}).populate({ path: 'emitter'}).populate({ path: 'contratista'}).exec((err, messagess) => {
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



  function getMyOfertasRealizadas(req, res) {
    //console.log("estoy trayedo mensajes");
    var userId = req.user.sub;
      console.log(userId);
   // var message = Viaje.find({ '$and': [ {'$or':[{ estado:0 },{estado:1}]},{
      //receiver: userId

      var message =NuevaOferta.find({'$and':[{'$or':[{ estadoPago:1 },{estadoPago:2}]},{contratista: userId}]}).populate({ path: 'emitter'}).populate({ path: 'contratista'}).exec((err, messagess) => {
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
  function updateOferta(req, res){

    var userId = req.params.id;
    var update = req.body;

    console.log("recisemos si es el mismo"+userId);


    NuevaOferta.findByIdAndUpdate(userId, update, (err, userUpdate) => {

      if (err) {
          res.status(500).send({
              message: "Error al actualizar Usuario."
          });

      } else {
          if (!userUpdate) {
              res.status(404).send({
                  message: "El usuario no ha podido actualizarse."
              });
          } else {
              res.status(200).send({
                  user: userUpdate
              });
          }
      }

  });

  }


  function ofertaCumplida(req, res)
  {
    var params = req.body._id;
    console.log("el ide"+params);
    NuevaOferta.updateMany({ _id: params }, { '$set': { estadoPago: "1" } }, (err, ofertaCumplida) => {

        if (err) {
            res.status(500).send({ message: "Error al actualizar estado paggo oferta" });

        } else {
            if (!ofertaCumplida) {
                res.status(404).send({ message: "La oferta no se ha apagado" });
            } else {
                //console.log(solicitudViajeUpdate);
                res.status(200).send({ofertaCumplida:ofertaCumplida});

            }
        }

    });
  }


  function ofertaPagada(req, res)
  {
    var params = req.body._id;
    console.log("el ide"+params);
    NuevaOferta.updateMany({ _id: params }, { '$set': { estadoPago: "2" ,AdministradorPago:req.user.sub} }, (err, ofertaPagada) => {

        if (err) {
            res.status(500).send({ message: "Error al actualizar estado paggo oferta" });

        } else {
            if (!ofertaPagada) {
                res.status(404).send({ message: "La oferta no se ha apagado" });
            } else {
                //console.log(solicitudViajeUpdate);
                res.status(200).send({ofertaPagada:ofertaPagada});

            }
        }

    });
  }

  function getOfertasPagadas(req, res) {
    //console.log("estoy trayedo mensajes");
    var userId = req.user.sub;
      console.log(userId);
   // var message = Viaje.find({ '$and': [ {'$or':[{ estado:0 },{estado:1}]},{
      //receiver: userId

      var message =NuevaOferta.find({ estadoPago:2 }).populate({ path: 'emitter'}).populate({ path: 'contratista'}).exec((err, messagess) => {
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

 function getOfertasPerfil(req, res)
 {
   
  var userId = req.params.id;
      console.log(userId);
 

      var message =NuevaOferta.find({'$and':[{ estado:1 },{emitter: userId}]}).populate({ path: 'emitter'}).populate({ path: 'contratista'}).exec((err, messagess) => {
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
    getAllNuevasOfertas,
    getMyOfertas,
    updateOferta,
    getAllOfertasPorPagar,
    getMyOfertasPendientes,
    ofertaCumplida,
    getMyOfertasRealizadas,
    ofertaPagada,
    getOfertasPagadas,
    getOfertasPerfil
    
   
    
};