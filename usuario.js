const mongoose = require('mongoose');


const usuarioSchema = new mongoose.Schema({
    usuario_id: { type: Number, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    Correo: { type: String, required: true }
}, { versionKey: false }); 


const usuario = mongoose.model('usuario', usuarioSchema, 'usuarioes');

module.exports = usuario;