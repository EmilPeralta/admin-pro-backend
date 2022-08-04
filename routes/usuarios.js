
// Ruta: /api/usuarios

const { Router } = require("express");
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controller/usuarios');
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT, validarAdminRole, validarAdminRole_mismoUsuario } = require("../middlewares/validar-jwt");

const router = Router();

router.get('/', validarJWT, getUsuarios );

router.post('/',
    [
        // validarJWT,
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('apellido', 'El apellido es obligatorio').notEmpty(),
        check('password', 'El password es obligatorio').notEmpty(),
        check('email', 'El email es obligatorio').notEmpty(),
        validarCampos
    ],
crearUsuario );

router.put('/:id', 
    [
        validarJWT,
        validarAdminRole_mismoUsuario,
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('apellido', 'El apellido es obligatorio').notEmpty(),
        check('role', 'El Role es obligatorio').notEmpty(),
        validarCampos
    ], actualizarUsuario );

router.delete('/:id',[validarJWT, validarAdminRole], borrarUsuario );

module.exports = router;