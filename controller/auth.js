
// IMPORTACIONES
const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuarios");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
const { getMenuFrontEnd } = require("../helpers/menu-frontEnd");

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
            token,
            menu: getMenuFrontEnd(usuarioDB.role)
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
}

const googleSignIn = async(req, res = response)=>{

    try {
        const { email, name, picture} = await googleVerify(req.body.token);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        if(!usuarioDB){
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }
        //Guardar Usuario
        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            email, name, picture,
            token,
            menu: getMenuFrontEnd(usuario.role)
        });
        
    } catch (error) {

        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es correcto'
        });  
    }
}

const actualizarToken = async(req, res= response)=> {
    
    const uid = req.uid;
    const usuario = await Usuario.findById(uid);

    // Generar Token JWT
    const token = await generarJWT(uid);
    
    res.json({
        ok: true,
        token,
        usuario,
        menu: getMenuFrontEnd(usuario.role)
    });
}

module.exports = {
    login,
    googleSignIn,
    actualizarToken
}