const express = require('express');

const router = new express.Router();

router.get('', (req, res) => {
    res.render('index', { layout: 'master' });
});

router.get('/menu', (req, res) => {
    res.render('menu', { layout: 'master' });
});

router.get('/services', (req, res) => {
    res.render('services', { layout: 'master' });
});

router.get('/gallery', (req, res) => {
    res.render('gallery', { layout: 'master' });
});

router.get('/about', (req, res) => {
    res.render('about', { layout: 'master' });
});

module.exports = router;