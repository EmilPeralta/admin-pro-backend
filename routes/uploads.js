//RUTAS UPLOAD
// Ruta = /api/upload
//==============================================

const { Router } = require("express");
const { subirArchivo, getArchivo } = require("../controller/uploads");
const { validarJWT } = require("../middlewares/validar-jwt");
const expressfileUpload = require('express-fileupload');

const router = Router();
router.use( expressfileUpload() );

router.put('/:tipo/:id', validarJWT, subirArchivo);

router.get('/:tipo/:foto', getArchivo);

module.exports = router;
