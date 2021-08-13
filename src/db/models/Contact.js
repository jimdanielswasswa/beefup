const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        maxLength: 500,
        trim: true
    },
    from: {
        type: String,
        required: true,
        maxLength: 28,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phonenumber: {
        type: String,
        lowercase: true,
        minLength: 10,
        trim: true
    }
}, {
    timestamps: true
});

const Contact = new mongoose.model('Contact', contactSchema);

module.exports = Contact;