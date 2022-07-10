
const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {

    return new Promise( (resolve, reject) => {
        const payload = {
            // aqui se puden colocar los parametros deseados
            // nombre,email, etc. 
            uid
        };
    
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h' //casa 12 horas expira
            }, (err, token)  => {

                if(err){
                    console.log(err);
                    reject('No se pudo generar el JWT');
                } else {
                    resolve(token);
                }
            }
        )
    });
}

module.exports = {
    generarJWT
}