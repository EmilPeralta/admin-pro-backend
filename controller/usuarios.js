const Usuario = require("../models/usuarios");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async(req, res) => {
    
    const desde = Number( req.query.desde) || 0;
    // El Codigo debajo equivale a esto, pero mejorado.
    // const usuarios = await Usuario.find({},'email nombre apellido google role')
    //                               .skip(desde)
    //                               .limit(5);

    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'email nombre apellido google role img')
               .skip(desde)
               .limit(5),
        
        Usuario.countDocuments()
    ]);

    
    res.json({
        ok: true,
        usuarios,
        total
    });
}

const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: "Correo ya existe"
            });
        }
        const usuario = new Usuario(req.body);

        // Encriptar campo
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Guardar Usuario
        await usuario.save();

        // Generar TOKEN JWT
        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status.json({
            ok: false,
            msg: "Error Inesperado... revisar logs"
        });
    }
}

const actualizarUsuario = async (req, res = response) => {
    
    const uid = req.params.id;
    
    try {
        // TODO: validar token y controlar si es usuario correcto
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: "Usuario no existe"
            });
        }

        // Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if(usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usuario con ese email"
                });
            }
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const borrarUsuario = async (req, res = response ) => {

    const uid = req.params.id;
    try {
        const usuarioDB = Usuario.findById(uid);
        if(!usuarioDB){
            res.json({
                ok: true,
                msg: "Usuario No existe"
            });
        }

        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: "Usuario Eliminado"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contactar al administrador"
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}