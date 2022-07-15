// HOSPITALES
// Ruta: /api/hospitales

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getHospitales,
        crearHospital,
        actualizaHospital,
        borrarHospital } = require("../controller/hospitales")

const router = Router();

router.get('/', getHospitales );

router.post('/',
    [
        validarJWT,
        check('nombre','El nombre del hospital es necesario').notEmpty(),
        validarCampos
    ],
    crearHospital );

router.put('/:id', 
    [
        
    ], actualizaHospital );

router.delete('/:id', borrarHospital );

module.exports = router;