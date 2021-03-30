// this verify if is the same user who are making changes

const verifyUser = ( req, res, next ) =>{
    const {id} = req.params; 

    if( id !== req.user.id ){
        return res.status(401).json({
            msg: 'you dont own the account'
        });
    }
    next();
}

module.exports = {
    verifyUser
}