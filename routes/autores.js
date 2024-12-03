const express = require('express');
const router = express.Router();
const Autor = require('../models/autor'); 


router.get('/', async (req, res) => {
    try {
        const autores = await Autor.find();
        res.render('autores/autores', { autores });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/new', (req, res) => {
    res.render('autores/newAutor');
});


router.post('/', async (req, res) => {
    const { autor_id, nombre, apellido, nacionalidad, fechaNacimiento, biografia } = req.body;

    try {
        const newAutor = new Autor({ autor_id, nombre, apellido, nacionalidad, fechaNacimiento, biografia  });
        await newAutor.save(); 
        res.redirect('/autores');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



router.get('/edit/:id', async (req, res) => {
    try {
        const autor = await Autor.findById(req.params.id);
        if (!autor) return res.status(404).json({ message: 'Autor no encontrado' });
        res.render('autores/editAutor', { autor });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/edit/:id', async (req, res) => {
    const { autor_id, nombre, apellido, nacionalidad, fechaNacimiento, biografia } = req.body;
    try {
        await Autor.findByIdAndUpdate(req.params.id, { autor_id, nombre, apellido, nacionalidad, fechaNacimiento, biografia });
        res.redirect('/autores');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.post('/delete/:id', async (req, res) => {
    try {
        await Autor.findByIdAndDelete(req.params.id);
        res.redirect('/autores');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

