const mongoose = require('mongoose');


const generoSchema = new mongoose.Schema({
    genero_id: { type: Number, required: true },
    nombre: { type: String, required: true },
    genero: { type: String, required: true },
    descripcion: { type: String, required: true }
}, { versionKey: false }); 


const Genero = mongoose.model('Genero', generoSchema);

module.exports = Genero;
