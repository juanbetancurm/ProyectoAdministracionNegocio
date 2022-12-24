const mongoose = require ('mongoose');

//Se coloca el esquema a la base de datos
const clientesSchema = mongoose.Schema({
    nombres:{
        type:String,
        required:true
    },
    apellidos:{
        type:String,
        required:true
    },
    documento:{
        type:Number,
        required:true
    },
    correo:{
        type:String,
        required:true
    },
    telefono:{
        type:Number,
        required:true
    },
    direccion:{
        type:String,
        required:true
    },
    empresa:{
        type:String,
        required:true
    }
}, {versionkey : false})

module.exports = mongoose.model('Clientes', clientesSchema)