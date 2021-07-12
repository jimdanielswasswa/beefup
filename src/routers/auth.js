const express = require('express');
const passport = require('passport');

const User = require('../db/models/User');

const router = new express.Router();

router.get('/login', (req, res) => {
    res.render('admin-login', { layout: 'master' });
});
router.post('/login', async (req, res) => {
    try {
        console.log('aaaaaaaaaaaaa\n Here \naaaaaaaaaaaaaaa');
        // const user = await User.findByCredentials(req.body.username, req.body.password);
        // const token = await user.generateAuthToken();
        // res.render('admin-dashboard', { layout: 'master', auth_user: user.getPublicInfo(), token });
        passport.authenticate('local-signin',  {
            successRedirect: '/users/',
            failureRedirect: '/login/',
            failureFlash: true
        })
    } catch (e) {
        console.log('Login Failed Invalid Credentials.');
    }
});
router.get('/register', (req, res) => {
    res.render('register-user', { layout: 'master' });
});
router.post('/logout', async (req, res) => {
    req.logout();
    res.render('index', { layout: 'master' })
});
module.exports = router;