
// 1. Importar las librerias
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');

// 2. Crear el servidor de express
const app = express();

// Configurar cores
app.use(cors());

// Base de Datos
dbConnection();

console.log(process.env);

// Rutas
app.get('/', (req,res)=>{
    res.status.json({
        ok: true,
        msg: 'hola mundo'
    });
});

// llamar al servidor y ponerlo a correr en un puerto específico
app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});


//===========================================================================
// mean_user
// epW3IlcN6sFmv8vj
//===========================================================================