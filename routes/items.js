const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Página de inicio: Listar todos los items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.render('index', { items });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Formulario para crear un nuevo item
router.get('/items/new', (req, res) => {
    res.render('newItem');
});

// Crear un nuevo item (CREATE)
router.post('/items', async (req, res) => {
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
router.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item no encontrado' });
        res.render('itemDetail', { item });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Formulario para editar un item
router.get('/items/edit/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item no encontrado' });
        res.render('editItem', { item });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Actualizar un item (UPDATE)
router.post('/items/edit/:id', async (req, res) => {
    const { name, description, price } = req.body;
    try {
        await Item.findByIdAndUpdate(req.params.id, { name, description, price });
        res.redirect('/');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un item (DELETE)
router.post('/items/delete/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
