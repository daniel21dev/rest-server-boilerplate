const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generate-jwt');

const loginController = async(req,res) =>{

    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if( !user || !user.active ){
            return res.status(400).json({msg: 'email or password incorrect'});
        }
        if( !bcrypt.compareSync(password,user.password) ){
            return res.status(400).json({msg: 'email or password incorrect'});
        }
        const token = await generarJWT( user.id );
        res.json({token});;
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    loginController
}