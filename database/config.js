const mongoose = require('mongoose'); //Importación del paquete

const dbConnection = async ()=>{

    try{
                              //Esta dirección la tomamos de la base de datos
        await mongoose.connect(process.env.DB_CNN);

        console.log('DB online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD');
    }
}
//Exportamos la función dbConnction para usarla en el index.js
module.exports = {
    dbConnection
}