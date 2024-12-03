const express = require('express');
const router = express.Router();
const prestamo = require('../models/prestamo'); 


router.get('/', async (req, res) => {
    try {
        const prestamo = await prestamo.find();
        res.render('prestamo/prestamo', { prestamo });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/new', (req, res) => {
    res.render('prestamo/newPrestamo');
});


router.post('/', async (req, res) => {
    const {prestamo_id, usuarioprestamo,fecha_visita,descripcionprestamo } = req.body;

    try {
        const newprestamo = new prestamo({prestamo_id, usuarioprestamo,fecha_visita,descripcionprestamo });
        await newprestamo.save(); 
        res.redirect('/prestamo');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



router.get('/edit/:id', async (req, res) => {
    try {
        const prestamo = await prestamo.findById(req.params.id);
        if (!prestamo) return res.status(404).json({ message: 'prestamo no encontrado' });
        res.render('prestamo/editPrestamos', { prestamo });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/edit/:id', async (req, res) => {
    const {prestamo_id, usuarioprestamo,fecha_visita,descripcionprestamo } = req.body;
    try {
        await prestamo.findByIdAndUpdate(req.params.id, {prestamo_id, usuarioprestamo,fecha_visita,descripcionprestamo });
        res.redirect('/prestamo');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.post('/delete/:id' , async (req, res)=>{
    try{
        await prestamo.findByIdAndDelete(req.params.id);
        res.redirect('/prestamo');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

