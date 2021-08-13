const express = require('express');
const Contact = require('../db/models/Contact');
const MenuItem = require('../db/models/MenuItem');
const ServiceItem = require('../db/models/ServiceItem');
const PageImage = require('../db/models/PageImage');

const router = new express.Router();

router.get('', (req, res) => {
    res.render('index', { layout: 'master' });
});

router.get('/menu', async (req, res) => {
    const menuItems = await MenuItem.find({}, { 'createdby': 0, 'createdAt': 0, 'updatedAt': 0 });
    res.render('menu', { layout: 'master', menuItems });
});

router.get('/services', async (req, res) => {
    const serviceItems = await ServiceItem.find({}, { 'createdby': 0, 'createdAt': 0, 'updatedAt': 0 });
    res.render('services', { layout: 'master', serviceItems });
});

router.get('/gallery', async (req, res) => {
    const pageImages = await PageImage.find({}, { image: 1 });
    res.render('gallery', { layout: 'master', pageImages });
});

router.get('/about', (req, res) => {
    res.render('about', { layout: 'master' });
});
router.post('/contact', async (req, res) => {
    try{
        const { message, from, phonenumber, email } = req.body;        
        if(!message){}
        if(!from){}
        if(!email){}
        let contact = new Contact({ message, from, phonenumber, email });
        contact = await contact.save();
        res.status(201).json({ message: 'Message Sent!' });
    } catch(e){
        console.log(e);
    }
});
module.exports = router;