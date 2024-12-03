const express = require('express');
const router = express.Router();
const Especie = require('../models/especie'); 


router.get('/', async (req, res) => {
    try {
        const especies = await Especie.find();
        res.render('especies/especies', { especies });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/new', (req, res) => {
    res.render('especies/newEspecie');
});


router.post('/', async (req, res) => {
    const { especie_id, nombreComun, nombreCientifico, clasificacion } = req.body;

    try {
        const newEspecie = new Especie({ especie_id, nombreComun, nombreCientifico, clasificacion });
        await newEspecie.save(); 
        res.redirect('/especies');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



router.get('/edit/:id', async (req, res) => {
    try {
        const especie = await Especie.findById(req.params.id);
        if (!especie) return res.status(404).json({ message: 'Especie no encontrado' });
        res.render('especies/editEspecie', { especie });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/edit/:id', async (req, res) => {
    const { especie_id, nombreComun, nombreCientifico, clasificacion } = req.body;
    try {
        await Especie.findByIdAndUpdate(req.params.id, { especie_id, nombreComun, nombreCientifico, clasificacion });
        res.redirect('/especies');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.post('/delete/:id', async (req, res) => {
    try {
        await Especie.findByIdAndDelete(req.params.id);
        res.redirect('/especies');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;

