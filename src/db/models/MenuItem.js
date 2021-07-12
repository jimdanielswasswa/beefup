const mongoose = require('mongoose');

const MenuItem = mongoose.model('MenuItem', {
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        typ: String,
        trim: true
    },
    price: {
        type: double
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

module.exports = MenuItem;