const {Schema,model} = require('mongoose');

const UserSchema = Schema({
    name:{
        type: String,
        required: [true,'Name is required']
    },
    userName:{
        type: String,
        required: [true,'UserName is required'],
        unique: true
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
    const { __v, password, _id, active, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema);