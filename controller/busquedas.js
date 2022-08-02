// CONTROLADOR BUSQUEDAS
// =============================================

const { response } = require("express");
const Usuario = require("../models/usuarios");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

getTodo = async(req, res = response)=> {

    const buscar = req.params.busqueda;
    const regex = new RegExp(buscar, 'i'); //Expresion regular incensible 'i'

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })  
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
}

getDocumentoColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const buscar = req.params.busqueda;
    const regex = RegExp(buscar, 'i');
    let data = [];
    
    switch (tabla) {
        case 'usuario':
            data = await Usuario.find({nombre: regex});
        break;

        case 'medico':
            data = await Medico.find({nombre: regex})
                               .populate('usuario', 'nombre img')
                               .populate('hospital', 'nombre img');
        break;

        case 'hospital':
            data = await Hospital.find({nombre: regex})
                                 .populate('usuario', 'nombre img')
        break;
    
        default:
            return res.status(400).json({
                        ok: false,
                        msg: 'La tabla tiene que ser: usuario/medico/hospital'
                    });
    }
                    
        res.json({
            ok: true,
            resultados: data
        })
}

module.exports = {
    getTodo,
    getDocumentoColeccion
}