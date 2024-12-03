const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario'); 

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.render('usuarios/usuarios', { usuarios });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Mostrar el formulario para crear un nuevo usuario
router.get('/new', (req, res) => {
    res.render('usuarios/newusuario');
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    const { nombre, apellido, email, telefono } = req.body; 

    const newUsuario = new Usuario({
        nombre,
        apellido,
        email,
        telefono,
    });

    try {
        await newUsuario.save(); 
        res.redirect('/usuarios');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Mostrar el formulario para editar un usuario
router.get('/edit/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.render('usuarios/editusuario', { usuario });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Actualizar un usuario
router.post('/edit/:id', async (req, res) => {
    const { nombre, apellido, email, telefono } = req.body; // Cambia 'Correo' a 'email'
    
    try {
        await Usuario.findByIdAndUpdate(req.params.id, { nombre, apellido, email, telefono }, { new: true });
        res.redirect('/usuarios');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un usuario
router.post('/delete/:id', async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.redirect('/usuarios');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;