const express = require('express');
const router = express.Router();
const usuario = require('../models/usuario'); 


router.get('/', async (req, res) => {
    try {
        const usuarios = await usuario.find();
        res.render('usuarios/usuarios', { usuarios });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/new', (req, res) => {
    res.render('usuarios/newusuario');
});


router.post('/', async (req, res) => {
    const { usuario_id, nombre, apellido, Correo } = req.body;

    try {
        const newAnimal = new usuario({ usuario_id, nombre, apellido, Correo });
        await newAnimal.save(); 
        res.redirect('/usuarios');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



router.get('/edit/:id', async (req, res) => {
    try {
        const usuario = await usuario.findById(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'usuario no encontrado' });
        res.render('usuarios/editusuario', { usuario });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/edit/:id', async (req, res) => {
    const { usuario_id, nombre, apellido, Correo } = req.body;
    try {
        await usuario.findByIdAndUpdate(req.params.id, { usuario_id, nombre, apellido, Correo });
        res.redirect('/usuarios');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.post('/usuarios/delete/:id' , async (req, res)=>{
    try{
        await usuario.findByIdAndDelete(req.params.id);
        res.redirect('/usuarios');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

