// CONTROLADORES
//===========================================================

const { response } = require("express");
const Medico = require("../models/medico");

const getMedicos = async(req, res = response)=>{

    const medicos = await Medico.find()
                                .populate('usuario','nombre img')
                                .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    });
}

const getMedicosById = async(req, res = response)=>{

    const id = req.params.id;
    try {
        const medico = await Medico.findById(id)
                                    .populate('usuario','nombre img')
                                    .populate('hospital', 'nombre img');
        res.json({
            ok: true,
            medico
        });
        
    } catch (error) {
        ok: false;
        msg: 'Error al buscar el médico'
    }
}

const crearMedico = async (req, res=response)=>{

    const uid = req.uid;
    const medico = new Medico({usuario: uid, ...req.body});

    try {
        const medicoDB = await medico.save();
        res.json({
            ok: true,
            medicoDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Comunicarse con el administrador"
        })
    }
    
}

const actualizarMedico = async(req, res = response)=>{

    const id = req.params.id;
    const uid = req.params.uid;
    try {
        const medicoDB = await Medico.findById(id);
        if(!medicoDB){
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado'
            });
        }

        const cambiosMedico = { ...req.body, usuario: uid }

        const medicoAcualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new:true} );
            res.json({
                ok: true,
                medico: medicoAcualizado
            });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contactar al administrador'
        })
    }

}

const borrarMedico = async(req, res = response)=>{

    try {

        const id = req.params.id;
        const medicoDB = await Medico.findById(id);
        if(!medicoDB){
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado'
            })
        }

        await Medico.findByIdAndDelete(medicoDB);
        res.json({
            ok: true,
            msg: 'Médico Borrado',
            medico: medicoDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contactar al administrador'
        });
    }

}

module.exports = {
    getMedicos,
    getMedicosById,
    crearMedico,
    actualizarMedico,
    borrarMedico
}