
// IMPORTACIONES
const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuarios");
const { generarJWT } = require("../helpers/jwt");

const login = async( req, res = response) => {

    const { email, password} = req.body;
    try {
        // Verificar email
        const usuarioDB = await Usuario.findOne( {email} );
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: "Credenciales incorrectas e"
            });
        }

        // Verificar Contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: "Credenciales incorrectas p"
            });
        }
        
        // Generar TOKEN JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
}

module.exports = {
    login
}