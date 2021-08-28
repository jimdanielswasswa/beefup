const mongoose = require('mongoose');
const User = require('./User');

const menuItemSchema = new mongoose.Schema({
    itemname: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    image: {
        type: Buffer,
        required: true
    },
    createdby: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: User
    }
}, {
    timestamps: true
});
menuItemSchema.methods.get_menuItem = function () {
    const obj = this.toObject();
    delete obj.image;
    return obj;
};
menuItemSchema.post('save', async function (error, document, next) {    
    if (error.name === 'MongoError' && error.code === 11000) {
        if (error.toString().indexOf('itemname') > -1) {
            throw new Error('Item Name Already In Use.');
        }
    }
    next();
});
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;