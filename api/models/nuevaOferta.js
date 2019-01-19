// los modelos son representacions de las entiades de la base de datos
'use strict'

var mongoose = require('mongoose');
// a traves del paquete que se trabaja la base
var Schema = mongoose.Schema;
// definir un modelo de la base de datos   crear un objeto de tipo es quema al  guardar un objeto de tipo esquema 
//ya se puede agregar una //nueva colleccion en la bas dde datos 

// estos esquemas son las clases comunes 

var NuevaOfertaSchema = Schema({
    Links_to_work: String,
    Categoria: String,
    OtraCategoria: String,
    Faceboock: String,
    Instagram: String,
    Twiter: String,
    OtraRed: String,
    Tiempo: String,
    Precio: String,
    Alcance: String,
    Inf_extra: String,
    estado:String,
    estadoPago:String,
    emitter: { type: Schema.ObjectId, ref: "User" },
    contratista: { type: Schema.ObjectId, ref: "User" }
});

module.exports = mongoose.model('NuevaOferta', NuevaOfertaSchema); 
//de esta forma al exportar se podra utilizar el 
//objeto donde se lo llame con el use strict cuando se necesite este objeto d=tendremos un objeto de tipo
//'User' que tendra un UserSchema al cual se le llamara y se le llenara de datos