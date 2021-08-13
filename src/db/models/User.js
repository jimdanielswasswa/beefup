const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

const user_schema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 8,
        required: true,
        validator: (value) => {
            if(value.trim().length < 8){
                throw Error('Password Must Be 8 Or More Characters Long.');
            }
        }
    },
    email: {
        type:String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true
    },
    isadmin: {
        type: Boolean,
        required: true,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required:true
        }
    }]
}, {
    timestamps: true
});
user_schema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({username});
    if(!user){
        throw new Error('Login Failed.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Login Failed.');
    }
    return user;
};
user_schema.methods.generateAuthToken = async function(){
    const token = await jwt.sign({ _id: this._id.toString() }, 'beefup-secret-key');
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
}
user_schema.methods.getPublicInfo = function(){
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}
user_schema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});
const User = mongoose.model('User', user_schema);

module.exports = User;