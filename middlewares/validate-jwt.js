const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async ( req = request, res = response, next) =>{

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPUBLICKEY );
        const userAuth = await User.findById( uid );

        if( !userAuth || !userAuth.active ){
            res.status(401).json({
                msg: 'Invalid token'
            });
        }

        req.user = userAuth;

        next();
    } catch (error) {
        console.log( error );
        res.status(401).json({
            msg: 'Invalid token'
        })
    }

}


module.exports = {
    validateJWT
}