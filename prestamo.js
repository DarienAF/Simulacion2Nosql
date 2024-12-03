const mongoose = require('mongoose');


const prestamoSchema = new mongoose.Schema({
    prestamo_id: { type: Number, required: true },
    usuarioprestamo: { type: String, required: true },
    fecha_visita: { type: Date, required: true },
    descripcionprestamo: { type: String, required: true }
}, { versionKey: false }); 


const prestamo = mongoose.model('Prestamo', prestamoSchema);

module.exports = prestamo;