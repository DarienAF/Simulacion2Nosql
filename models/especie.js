const mongoose = require('mongoose');


const especieSchema = new mongoose.Schema({
    especie_id: { type: Number, required: true },
    nombreComun: { type: String, required: true },
    nombreCientifico: { type: String, required: true },
    clasificacion: { type: String, required: true }
}, { versionKey: false }); 


const Especie = mongoose.model('Especie', especieSchema);

module.exports = Especie;
