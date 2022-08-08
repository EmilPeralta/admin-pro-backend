
// 1. Importar las librerias
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
const path = require( 'path' );

// 2. Crear el servidor de express
const app = express();

// Configurar cores
app.use( cors() );

// Carpeta pública
app.use(express.static('public'));

// Lectura y parseo del body
app.use( express.json() );

// Base de Datos
dbConnection();

console.log(process.env);

// Rutas Index
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/hospitales',require('./routes/hospitales'));
app.use('/api/medicos',require('./routes/medicos'));
app.use('/api/todo',require('./routes/busquedas'));
app.use('/api/login',require('./routes/auth'));
app.use('/api/upload',require('./routes/uploads'));

// TODO habilitar al momento de pasar a producción
// app.get('*', (req, res)=>{
//     res.sendFile(path.resolve(__dirname, 'public/index.html'));
// });


// llamar al servidor y ponerlo a correr en un puerto específico
app.listen(process.env.PORT || 3000, ()=>{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});


//===========================================================================
// mean_user
// epW3IlcN6sFmv8vj
//===========================================================================