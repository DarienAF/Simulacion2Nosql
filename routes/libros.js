const express = require('express');
const router = express.Router();
const Libro = require('../models/libro');

// Página de inicio: Listar todos los libros
router.get('/', async (req, res) => {
    try {
        const libros = await Libro.find();
        res.render('index', { libros });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Formulario para crear un nuevo item
router.get('/libros/new', (req, res) => {
    res.render('newItem');
});

// Crear un nuevo item (CREATE)
router.post('/libros', async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const newItem = new Item({ name, description, price });
        await newItem.save();
        res.redirect('/');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Mostrar detalles de un item
router.get('/libros/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item no encontrado' });
        res.render('itemDetail', { item });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Formulario para editar un item
router.get('/libros/edit/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item no encontrado' });
        res.render('editItem', { item });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Actualizar un item (UPDATE)
router.post('/libros/edit/:id', async (req, res) => {
    const { name, description, price } = req.body;
    try {
        await Item.findByIdAndUpdate(req.params.id, { name, description, price });
        res.redirect('/');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un item (DELETE)
router.post('/libros/delete/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
