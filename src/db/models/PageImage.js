const mongoose = require('mongoose');
const Page = require('./Page');

const ImageSchema = new mongoose.Schema({
    image: {
        type: Buffer
    },
    page: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Page,
        required: true
    }
},{
    timestamps: true
});

const  PageImage = mongoose.model('PageImage', ImageSchema);

module.exports = PageImage;