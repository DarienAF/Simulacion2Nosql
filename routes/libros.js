const express = require('express');
const router = express.Router();
const Libro = require('../models/libro'); 

// Pagina de inicio: Listar todos los libros
router.get('/', async (req, res) => {
    try {
        const libros = await Libro.find();
        res.render('libros/libros', { libros }); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Formulario para crear un nuevo libro
router.get('/new', (req, res) => {
    res.render('libros/newLibro');
});

// Crear un nuevo libro (CREATE)
router.post('/', async (req, res) => {
    const { titulo, autor, anio_publicacion, genero, ubicacion } = req.body; 
    try {
        const nuevoLibro = new Libro({ titulo, autor, anio_publicacion, genero, ubicacion });
        await nuevoLibro.save();
        res.redirect('/libros');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Mostrar detalles de un libro
router.get('/:id', async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });
        res.render('libros/libroDetail', { libro }); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Formulario para editar un libro
router.get('/edit/:id', async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });
        res.render('libros/editLibro', { libro }); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Actualizar un libro (UPDATE)
router.post('/edit/:id', async (req, res) => {
    const { titulo, autor, anio_publicacion, genero, ubicacion } = req.body; 
    try {
        await Libro.findByIdAndUpdate(req.params.id, { titulo, autor, anio_publicacion, genero, ubicacion });
        res.redirect('/libros');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un libro (DELETE)
router.post('/delete/:id', async (req, res) => {
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.redirect('/libros');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;