const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const auth = require('../middlewares/auth');
const MenuItem = require('../db/models/MenuItem');

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

router.get('/menu-items/', auth, async (req, res) => {
    const menuItems = await MenuItem.find({}).populate('createdby', "username").exec();
    return res.render('menuitems', { layout: 'admin-master', menuItems });
});
router.get('/menu-items/:id', auth, (req, res) => { });
router.post('/menu-items/', auth, imageUpload.single('menu-image'), async (req, res) => {
    const { itemname, description, price, createdby = req.user._id } = req.body;
    const image_buffer = req.file.buffer;
    let error;
    if (!itemname) {
        error = "Item Name Is Required.";
        return res.redirect(`/menu-items/#menu-item-modal?e=${error}`);
    }
    if (!description) {
        error = "Description Is Required.";
        return res.redirect(`/menu-items/#menu-item-modal?e=${error}`);
    }
    if (!price) {
        error = "Price Is Required.";
        return res.redirect(`/menu-items/#menu-item-modal?e=${error}`);
    }
    if (!image_buffer) {
        error = 'Image Is Required.';
        return res.redirect(`/menu-items/#menu-item-modal?e=${error}`);
    }
    let menuItem = new MenuItem({ itemname, description, price, image: await sharp(image_buffer).resize({ cover: 'Crop' }).jpeg().toBuffer(), createdby });
    menuItem = await menuItem.save();
    if (menuItem) {
        res.redirect('/menu-items/');
    }
});
// Handles PATCH and PUT
router.post('/menu-items/:id', auth, imageUpload.single('menu-image'), async (req, res) => {
    const { itemname, description, price } = req.body;
    const id = (req.params.id) ? req.params.id : 0;
    let image_buffer;
    if (req.file) {
        image_buffer = req.file.buffer;
    }
    let error;
    if (!itemname) {
        error = "Item Name Is Required.";
        return res.redirect(`/menu-items/#menu-item-modal?e=${error}`);
    }
    if (!description) {
        error = "Description Is Required.";
        return res.redirect(`/menu-items/#menu-item-modal?e=${error}`);
    }
    if (!price) {
        error = "Price Is Required.";
        return res.redirect(`/menu-items/#menu-item-modal?e=${error}`);
    }

    // if(!image_buffer){
    //     error = 'Image Is Required.';
    //     return res.redirect(`/menu-items/#menu-item-modal?e=${error}`);
    // }  
    let menuItem = await MenuItem.findById(id);
    if (menuItem) {
        menuItem.itemname = itemname;
        menuItem.description = description;
        menuItem.price = price;
        if (image_buffer) {
            menuItem.image = await sharp(image_buffer).resize({ cover: 'Crop' }).jpeg().toBuffer();
        }
    }
    menuItem = await menuItem.save();
    if (menuItem) {
        return res.redirect(`/menu-items/`);
    }
    // TODO Handle Errors;
});
router.delete('/menu-items/:id', auth, async (req, res) => {
    const id = (req.params.id) ? req.params.id : 0;
    const menuItem = await MenuItem.findByIdAndDelete(id);
    if (menuItem) {
        return res.status(200).json({ error: undefined, message: 'Menu Item Successfully Deleted.', data: menuItem });
    }
});

router.get('/menu-item/:id/image/', async (req, res) => {
    const id = (req.params.id) ? req.params.id : 0;
    const menuItem = await MenuItem.findById(id);
    if (menuItem) {
        res.set('Content-Type', 'image/jpeg');
        return res.send(menuItem.image);
    }
});

module.exports = router;