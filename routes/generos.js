const express = require('express');
const router = express.Router();
const Genero = require('../models/genero'); 


router.get('/', async (req, res) => {
    try {
        const generos = await Genero.find();
        res.render('generos/generos', { generos });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/new', (req, res) => {
    res.render('generos/newGenero');
});


router.post('/', async (req, res) => {
    const { genero_id, nombre, genero, descripcion } = req.body;

    try {
        const newGenero = new Genero({ genero_id, nombre, genero, descripcion });
        await newGenero.save(); 
        res.redirect('/generos');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



router.get('/edit/:id', async (req, res) => {
    try {
        const genero = await Genero.findById(req.params.id);
        if (!genero) return res.status(404).json({ message: 'Genero no encontrado' });
        res.render('generos/editGenero', { genero });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/edit/:id', async (req, res) => {
    const { genero_id, nombre, genero, descripcion} = req.body;
    try {
        await Genero.findByIdAndUpdate(req.params.id, { genero_id, nombre, genero, descripcion });
        res.redirect('/generos');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.post('/delete/:id', async (req, res) => {
    try {
        await Genero.findByIdAndDelete(req.params.id);
        res.redirect('/generos');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

