const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const auth = require('../middlewares/auth');
const ServiceItem = require('../db/models/ServiceItem');

const imageUpload = multer({
    limits: {
        fileSize: 2000000,
        fileSize: 20000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error('File must be either a png, a jpg or a jpeg'), false);
        }
        cb(undefined, true);
    }
});

const router = new express.Router();

router.get('/service-items/', auth, async (req, res) => {
    const serviceItems = await ServiceItem.find({}).populate('createdby', "username").exec();
    return res.render('service-items', { layout: 'admin-master', serviceItems });
});
router.get('/service-items/:id', auth, (req, res) => { });
router.post('/service-items/', auth, imageUpload.single('service-image'), async (req, res) => {
    const { itemname, description, startprice, createdby = req.user._id } = req.body;
    const image_buffer = req.file.buffer;
    let error;
    if (!itemname) {
        error = "Item Name Is Required.";
        return res.redirect(`/service-items/#service-item-modal?e=${error}`);
    }
    if (!description) {
        error = "Description Is Required.";
        return res.redirect(`/service-items/#service-item-modal?e=${error}`);
    }
    if (!startprice) {
        error = "Price Is Required.";
        return res.redirect(`/service-items/#service-item-modal?e=${error}`);
    }
    if (!image_buffer) {
        error = 'Image Is Required.';
        return res.redirect(`/service-items/#service-item-modal?e=${error}`);
    }
    let serviceItem = new ServiceItem({ itemname, description, startprice, image: await sharp(image_buffer).resize({ cover: 'Crop' }).jpeg().toBuffer(), createdby });
    serviceItem = await serviceItem.save();
    if (serviceItem) {
        res.redirect('/service-items/');
    }
});
// Handles PATCH and PUT
router.post('/service-items/:id', auth, imageUpload.single('service-image'), async (req, res) => {
    const { itemname, description, startprice } = req.body;
    const id = (req.params.id) ? req.params.id : 0;
    let image_buffer;
    if (req.file) {
        image_buffer = req.file.buffer;
    }
    let error;
    if (!itemname) {
        error = "Item Name Is Required.";
        return res.redirect(`/service-items/#service-item-modal?e=${error}`);
    }
    if (!description) {
        error = "Description Is Required.";
        return res.redirect(`/service-items/#service-item-modal?e=${error}`);
    }
    if (!startprice) {
        error = "Price Is Required.";
        return res.redirect(`/service-items/#service-item-modal?e=${error}`);
    }

    // if(!image_buffer){
    //     error = 'Image Is Required.';
    //     return res.redirect(`/service-items/#service-item-modal?e=${error}`);
    // }  
    let serviceItem = await ServiceItem.findById(id);
    if (serviceItem) {
        serviceItem.itemname = itemname;
        serviceItem.description = description;
        serviceItem.startprice = startprice;
        if (image_buffer) {
            serviceItem.image = await sharp(image_buffer).resize({ cover: 'Crop' }).jpeg().toBuffer();
        }
    }
    serviceItem = await serviceItem.save();
    if (serviceItem) {
        return res.redirect(`/service-items/`);
    }
    // TODO Handle Errors;
});
router.delete('/service-items/:id', auth, async (req, res) => {
    const id = (req.params.id) ? req.params.id : 0;
    const serviceItem = await ServiceItem.findByIdAndDelete(id);
    if (serviceItem) {
        return res.status(200).json({ error: undefined, message: 'Menu Item Successfully Deleted.', data: serviceItem });
    }
});

router.get('/service-item/:id/image/', async (req, res) => {
    const id = (req.params.id) ? req.params.id : 0;
    const serviceItem = await ServiceItem.findById(id);
    if (serviceItem) {
        res.set('Content-Type', 'image/jpeg');
        return res.send(serviceItem.image);
    }
});

module.exports = router;