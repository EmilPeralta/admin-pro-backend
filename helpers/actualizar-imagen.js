
const fs = require('fs');
const Usuario = require('../models/usuarios');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const path = require('path');

const borrarImagen = (path)=> {
    if( fs.existsSync(path)){
        // Borrar imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';
    switch (tipo) {
            case 'medico':
                    const medico = await Medico.findById(id);
                    if(!medico){
                        console.log('No existe medico con este id');
                        return false;
                    }
                    pathViejo = `./uploads/medico/${ medico.img }`;
                    borrarImagen(pathViejo);
                    console.log(medico.img);
                    
                    medico.img = nombreArchivo;
                    await medico.save();
                    return true;
            break;

            case 'hospital':
                const hospital = await Hospital.findById(id);
                if(!hospital){
                    console.log('No existe hospital con este id');
                    return false;
                }
                pathViejo = `./uploads/hospital/${ hospital.img }`;
                borrarImagen(pathViejo);
                
                hospital.img = nombreArchivo;
                await hospital.save();
                return true;
            
            break;

            case 'usuario':
                const usuario = await Usuario.findById(id);
                if(!usuario){
                    console.log('No existe usuario con este id');
                    return false;
                }
                pathViejo = `./uploads/usuario/${ usuario.img }`;
                borrarImagen(pathViejo);
                
                usuario.img = nombreArchivo;
                await usuario.save();
                return true;
            
            break;
    
        default:
            break;
    }

}

module.exports = {
    actualizarImagen
}