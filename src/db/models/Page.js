const { Modifiers } = require('chalk');
const mongoose = require('mongoose');
const User = require('./User');

const pageSchema = mongoose.Schema({
    pagename: {
        type: String,
        // required: true,
        trim: true,
        lowerCase: true
    },
    createdby: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: User
    }
}, { 
    timestamps: true
 });

 pageSchema.methods.get_page = function(){
     const obj = this.toObject();
     delete obj.images;
     return obj;
 }
const Page = mongoose.model('Page', pageSchema);

module.exports = Page;