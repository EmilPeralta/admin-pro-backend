
// 1. Importar las librerias
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// 2. Crear el servidor de express
const app = express();

// Configurar cores
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Base de Datos
dbConnection();

console.log(process.env);

// Rutas Index
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/login',require('./routes/auth'));


// llamar al servidor y ponerlo a correr en un puerto específico
app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});


//===========================================================================
// mean_user
// epW3IlcN6sFmv8vj
//===========================================================================