const { Modifiers } = require('chalk');
const mongoose = require('mongoose');

const Page = mongoose.model('Page', {
    pageName: {
        type: String,
        required: true,
        trim: true,
        lowerCase: true
    },
    images: {
        type: Array
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, { 
    timestamps: true
 });

module.exports = Page;