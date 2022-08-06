
// path: /api/login

const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn, actualizarToken } = require("../controller/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get('/', 
        [
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password es obligatorio').not().isEmpty(),
            validarCampos
        ],
    login
)

router.post('/google', 
        [
            check('token', 'El token de google es obligatorio').not().isEmpty(),
            validarCampos
        ],
        googleSignIn
)

router.get('/renew', validarJWT, actualizarToken)

module.exports = router;