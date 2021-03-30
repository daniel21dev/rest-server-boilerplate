const User = require('../models/user');

const emailExists = async( email ) =>{
    const userExists = await User.findOne({ email });
    if( userExists ){
        throw new Error(`the email ${ email } is already registered`);
    }
}

const userNameExists = async( userName ) =>{
    const userExists = await User.findOne({ userName });
    if( userExists ){
        throw new Error(`the userName ${ userName } is already registered`);
    }
}

module.exports = {
    emailExists,
    userNameExists
}