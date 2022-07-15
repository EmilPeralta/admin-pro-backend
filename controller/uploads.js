//CONTROLADOR UPLOADS
//==============================================

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const path = require("path");
const fs = require("fs");

const subirArchivo = async (req, res = response)=> {

    const tipo = req.params.tipo;
    const id   = req.params.id;

    // validar tipo
    const tiposValidos = 'hospital, usuario, medico';
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario, hospital (tipo)'
        });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
      }

    //   Procesar la imagen...
    const archivo = req.files.imagen;

    // extraer la extensión
    const nombreCortado = archivo.name.split('.'); //separa por punto el nombre
    const extensionArchivo = nombreCortado[nombreCortado.length-1];

    // Validar el tipo de extensión
    const extensionValida = ['png', 'jpg', 'jpeg', 'gif'];
    if(!extensionValida.includes(extensionArchivo) ){
        return res.status(400).json({
            ok: true,
            msg: 'Tipo de archivo no válido (ext)'
        });
    }

    // Generar el nombre del archivo.
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // Path para guardar la Imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // Guardar la imagen
    archivo.mv( path, (err)=> {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover el archivo'
            });
        }
    
        // Actualizar base de datos
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo cargado',
            nombreArchivo
        });
      });
}

const getArchivo = async (req, res = response)=>{

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    // Imagen buscada
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg)
    } else {
        // Imagen por defecto
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
}

module.exports = {
    subirArchivo,
    getArchivo
}
