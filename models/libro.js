const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    anio_publicacion: { type: Number, required: true },
    genero: { type: String, required: true },
    disponible: {
        type: Boolean,
        default: true 
      },
    ubicacion: { type: String, required: true },
    fecha_agregado: { type: Date, default: Date.now }
}, { versionKey: false }); 

module.exports = mongoose.model('Libro', libroSchema);


