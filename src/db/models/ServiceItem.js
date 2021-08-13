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

const ServiceItem = mongoose.model('ServiceItem', serviceItemSchema);

module.exports = ServiceItem;