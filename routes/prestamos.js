const express = require('express');
const router = express.Router();
const Prestamo = require('../models/prestamo');

// Obtener todos los prestamos
router.get('/', async (req, res) => {
    try {
        const prestamos = await Prestamo.find();
        res.render('prestamos/prestamos', { prestamos });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Mostrar el formulario para crear un nuevo prestamo
router.get('/new', (req, res) => {
    res.render('prestamos/newprestamo');
});

// Crear un nuevo prestamo
router.post('/', async (req, res) => {
    const { libro, usuario, fecha_devolucion } = req.body;

    const newPrestamo = new Prestamo({
        libro,
        usuario,
        fecha_devolucion,
    });

    try {
        await newPrestamo.save();
        res.redirect('/prestamos');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Mostrar el formulario para editar un prestamo
router.get('/edit/:id', async (req, res) => {
    try {
        const prestamo = await Prestamo.findById(req.params.id);
        if (!prestamo) return res.status(404).json({ message: 'Prestamo no encontrado' });
        res.render('prestamos/editprestamo', { prestamo });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Actualizar un prestamo
router.post('/edit/:id', async (req, res) => {
    const { libro, usuario, fecha_devolucion, estado } = req.body;

    try {
        await Prestamo.findByIdAndUpdate(req.params.id, { libro, usuario, fecha_devolucion, estado }, { new: true });
        res.redirect('/prestamos');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un prestamo
router.post('/delete/:id', async (req, res) => {
    try {
        await Prestamo.findByIdAndDelete(req.params.id);
        res.redirect('/prestamos');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;