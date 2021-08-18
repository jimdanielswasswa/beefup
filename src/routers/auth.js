const express = require('express');
const passport = require('passport');

const User = require('../db/models/User');

const router = new express.Router();

router.get('/login', (req, res) => {
    const errors = req.flash('error');
    if (errors) {
        return res.status(400).json({ errors });
    }
    if (!req.headers.referrer) {
        return res.redirect('/#login-modal');
    }
    return res.redirect(`${res.headers.referrer}/#login-modal`);
});
router.post('/login', passport.authenticate('local', { successRedirect: '/success/', failureRedirect: '#login-modal', failureFlash: true }));
router.post('/logout', async (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Successfully Logged Out!' });
});
router.get('/success/', (req, res) => {
    return res.status(200).json({ destination: '/users/', message: 'Success' });
});
module.exports = router;