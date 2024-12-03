const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const itemsRoutes = require('./routes/items');
const generosRoutes = require('./routes/generos');
const autoresRoutes = require('./routes/autores');
const librosRoutes = require('./routes/libros');
const usuarioRoutes = require('./routes/usuarios');
const prestamoRoutes = require('./routes/prestamos');

const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', './views');

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/Simulacion3', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error al conectar a MongoDB', err);
});

// Rutas
app.use('/libros', librosRoutes);
app.use('/generos', generosRoutes);
app.use('/autores', autoresRoutes);
// Configurar ruta
app.use('/usuarios', usuarioRoutes);
app.use('/prestamos', prestamoRoutes)
app.use('/', itemsRoutes);


// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
