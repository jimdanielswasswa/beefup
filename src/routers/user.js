const express = require('express');
const auth = require('../middlewares/auth');
const User = require('../db/models/User');

const router = new express.Router();

router.get('/users/', auth, async (req, res) => {
    const users = await User.find({}, { "username": 1, "email": 1, "isadmin": 1, "createdAt": 1 });
    if (((!users) || (users.length <= 0))) {
        return res.status(404).json({ error: "No Users Found.", data: undefined });
    }
    return res.render('users', { layout: 'admin-master', users, auth: { user: req.user.getPublicInfo(), isAauthenticated: req.isAuthenticated() } });
});
router.get('/users/:id', auth, async (req, res) => {
    const userId = (req.params.id) ? req.params.id.trim() : 0;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User Not Found', data: undefined });
    }
    return res.status(200).json({ error: undefined, data: user });
});
router.post('/users/', async (req, res) => {
    const { username, password, confirm_password, email, isadmin } = req.body;
    const errors = [];
    try {
        if (!username) {
            errors.push('Username Is Required.');
            return res.status(400).json({ errors, data: undefined });
        }
        if (!password) {
            errors.push('Password Is Required.');
            return res.status(400).json({ errors, data: undefined });
        } else {
            if (password.toLowerCase().trim() !== confirm_password.toLowerCase().trim()) {
                errors.push('Password Must Match Confirm Password.');
                return res.status(400).json({ errors, data: undefined });
            }
        }
        if (!email) {
            errors.push('Email Is Required.');
            return res.status(400).json({ errors, data: undefined });
        }
        let user = new User({ username, password, email, isadmin: Boolean(isadmin) });
        user = await user.save();
        if (user) {
            return res.status(201).json({ errors: undefined, message: 'User Successfully Created.' });
        }
    } catch (e) {
        const fields = ["username", "password", "email"];
        if(e.hasOwnProperty('errors')){
            fields.forEach((field) => {
                if (e.errors[field])
                    errors.push(e.errors[field].reason.toString());
            });
        } else {
            errors.push(e.toString());
        }
        const status = (errors.length > 0) ? 400 : 500;
        return res.status(status).json({ errors, data: undefined });
    }
});
router.patch('/users/:id', auth, async (req, res) => {
    const errors = [];
    try {
        const userId = (req.params.id) ? req.params.id.trim() : 0;
        const user = await User.findById(userId);
        if (!user) {
            errors.push('User Not Found.');
            return res.status(404).json({ errors, data: undefined });
        }
        const { username, email, password, confirm_password, isadmin } = req.body;
        console.log(email);
        if (username) {
            user.username = username;
        }
        if (password) {
            if (password.toLowerCase().trim() !== confirm_password.toLowerCase().trim()) {
                errors.push('Password Must Match Confirm Password.');
                return res.status(400).json({ errors, data: undefined });
            }
            user.password = password;
        }
        if (email) {
            user.email = email;
        }
        if (isadmin == true || isadmin == false) {
            user.isadmin = isadmin;
        }
        await user.save();
        if (user) {
            return res.status(200).json({ error: undefined, message: 'User Successfully Updated.' });
        }
    } catch (e) {
        const fields = ["username", "password", "email"];
        if(e.hasOwnProperty('errors')){
            fields.forEach((field) => {
                if (e.errors[field])
                    errors.push(e.errors[field].reason.toString());
            });
        } else {
            errors.push(e.toString());
        }
        const status = (errors.length > 0) ? 400 : 500;
        return res.status(status).json({ errors, data: undefined });
    }
});
router.delete('/users/:id', auth, async (req, res) => {
    try {
        const userId = (req.params.id) ? req.params.id : 0;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ error: 'User Not Found', data: undefined });
        }
        return res.status(200).json({ error: undefined, message: 'User Successfully Deleted.', data: user });
    } catch (error) {
        return res.status(500).json({ error: 'Something Went Wrong. Please Try Again.', data: undefined });
    }
}, (error) => {
    res.status(500).json({ error });
});

module.exports = router;