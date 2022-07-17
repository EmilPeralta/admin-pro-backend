// RUTA: api/medicos
//=====================================================================

const {Router} = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getMedicos,
        crearMedico,
        actualizarMedico,
        borrarMedico } = require("../controller/medicos");


const router = Router();

router.get('/', getMedicos);

router.post('/', 
    [
        validarJWT,
        check('nombre', 'El nombre del médico es obligatorio').notEmpty(),
        check('hospital', 'El hospital id debe ser válido').isMongoId(),
        validarCampos
    ], 
    crearMedico);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del médico es obligatorio').notEmpty(),
        check('hospital', 'El hospital id debe ser válido').isMongoId(),
        validarCampos

    ] ,actualizarMedico);

router.delete('/:id', validarJWT, borrarMedico);


module.exports = router;
