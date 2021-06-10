const {Schema,model} = require('mongoose');

const UserSchema = Schema({
    name:{
        type: String,
        required: [true,'Name is required']
    },
    email:{
        type: String,
        required: [true,'Email is required'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'Password is required']
    },
    active:{
        type: Boolean,
        default: true
    },
    img:{
        type: String
    }
});

UserSchema.methods.toJSON = function(){
    const { __v, password, active, ...user } = this.toObject();
    return user;
}

module.exports = model('User', UserSchema);