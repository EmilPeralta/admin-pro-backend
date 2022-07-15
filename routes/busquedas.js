// BUSQUEDAS RUTA
// Ruta: /api/todo/:Valor a buscar
// =====================================================

const { Router } = require("express");
const { getTodo } = require("../controller/busquedas");
const { validarJWT } = require("../middlewares/validar-jwt");
// const { validarCampos } = require("../middlewares/validar-campos");
// const ( check ) = require("express-validator");


const router = Router();

router.get('/:busqueda',validarJWT,getTodo );

router.get('/coleccion/:tabla/:busqueda',validarJWT,getDocumentoColeccion );

module.exports = router;
