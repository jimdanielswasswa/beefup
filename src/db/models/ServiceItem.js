const mongoose = require('mongoose');
const User = require('./User');

const serviceItemSchema = new mongoose.Schema({
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
    startprice: {
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
serviceItemSchema.post('save', async function (error, document, next) {    
    if (error.name === 'MongoError' && error.code === 11000) {
        if (error.toString().indexOf('itemname') > -1) {
            throw new Error('Service Name Already In Use.');
        }
    }
    next();
});

const ServiceItem = mongoose.model('ServiceItem', serviceItemSchema);

module.exports = ServiceItem;