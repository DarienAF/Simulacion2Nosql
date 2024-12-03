// models/prestamo.js

const mongoose = require('mongoose');

const prestamoSchema = new mongoose.Schema({
    libro: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    fecha_prestamo: {
        type: Date,
        required: true,
        default: Date.now
    },
    fecha_devolucion: {
        type: Date,
        required: true
    },
    estado: {
        type: String,
        enum: ['activo', 'devuelto'],
        default: 'activo'
    },
    fecha_devolucion_real: {
        type: Date,
        default: null
    }
});

// Exportar el modelo
module.exports = mongoose.model('Prestamo', prestamoSchema);