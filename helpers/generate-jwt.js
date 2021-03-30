const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) =>{
    return new Promise( (resolve, reject) =>{

        const payload = { uid };

        jwt.sign( payload , process.env.SECRETORPUBLICKEY, {
            expiresIn: '12h'
        }, ( err, token)=>{
            if( err ){
                console.log( err);
                reject('it could not generate jwt')
            }else{
                resolve( token );
            }
        });

    });
}



module.exports = {
    generarJWT
}