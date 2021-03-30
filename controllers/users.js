const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { Types } = require('mongoose');

const getUsers = async(req,res)=>{
    try {
        const users = await User.find();
        res.json( users );
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const saveUsers = async(req,res)=>{

    const {name,userName,email,password} = req.body;

    try {
        const user = User({name,userName,email,password});
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);
        await user.save();
        res.json({ user });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const updateUsers = async(req,res)=>{
    const {id} = req.params; 
    let {_id,active,userName,email,...toUpdate} = req.body;

    try {
        if( toUpdate.password ){
            const salt = bcrypt.genSaltSync(10);
            toUpdate.password = bcrypt.hashSync( toUpdate.password, salt);
        }
        const user = await User.findByIdAndUpdate(id,{...toUpdate},{ new:true });
        res.json(user);
    } catch (error) {
        return res.status(500).json({ error }); 
    }
    
}

const deleteUsers = async(req,res)=>{
    const {id} = req.params; 

    try {
        await User.findByIdAndUpdate(id,{ active: false });
        res.json({msg: 'user deleted'});
    } catch (error) {
        return res.status(500).json({ error }); 
    }
}



module.exports={
    getUsers,
    saveUsers,
    updateUsers,
    deleteUsers
}