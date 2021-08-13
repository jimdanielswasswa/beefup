const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    clientname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 28
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phonenumber: {
        type: String,
        required: true,
        trim: true
    },
    additionaldetails: {
        type: String,
        trim: true
    },
    reservationdatetime: {
        type: Date,
        required: true
    },
    isapproved: {
        type: Boolean,
        default: false
    },
    isrejected: {
        type: Boolean,
        default: false
    },
    rejectionreason: {
        type: String
    }
}, {
    timestamps: true
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;