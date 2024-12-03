const mongoose = require('mongoose');


const autorSchema = new mongoose.Schema({
    autor_id: { type: Number, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    nacionalidad: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    biografia: { type: String, required: true }
}, { versionKey: false }); 


const Autor = mongoose.model('Autor', autorSchema);

module.exports = Autor;
