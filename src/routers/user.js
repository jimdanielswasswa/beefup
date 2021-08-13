const express = require('express');
const auth = require('../middlewares/auth');
const User = require('../db/models/User');

const router = new express.Router();

router.get('/users/', auth, async (req, res) => {
    if (req.user.isadmin) {
        const users = await User.find({}, { "username": 1, "email": 1, "isadmin": 1, "createdAt": 1 });
        if (((!users) || (users.length <= 0))) {
            return res.status(404).json({ error: "No Users Found.", data: undefined });
        }
        return res.render('users', { layout: 'admin-master', users });
    } else {
        return res.status(403).json({ error: 'Insufficient Rights.' });
    }
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
    // try {
        if (!username) {
            return res.status(400).json({ error: 'Username Is Required.', data: undefined });
        } else {
            const existing = await User.findOne({ username });
            if (existing) {
                return res.status(400).json({ error: 'Username Taken.', data: undefined });
            }
        }
        if (!password) {
            return res.status(400).json({ error: 'Password Is Required.', data: undefined });
        } else {
            if (password.toLowerCase().trim() !== confirm_password.toLowerCase().trim()) {
                return res.status(400).json({ error: 'Password Must Match Confirm Password.', data: undefined });
            }
        }
        if (!email) {
            return res.status(400).json({ error: 'Email Is Required.', data: undefined });
        }
        let user = new User({ username, password, email, isadmin: Boolean(isadmin) });
        user = await user.save();
        if (user) {
            // return res.status(201).json({ error: undefined, message: 'User Successfully Created.', data: user.getPublicInfo() });
            // return res.render('users', { layout: 'admin-master', error: undefined, message: 'User Successfully Created.', data: user.getPublicInfo() });
            res.redirect('/users/');
        }
    // } catch (e) {
    //     res.status(500).json({ error: e.message, data: undefined, e, d: req.body });
    // }
});
// Handles PATCH / PUT
router.post('/users/:id', auth, async (req, res) => {
    try {
        const userId = (req.params.id) ? req.params.id.trim() : 0;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User Not Found.', data: undefined });
        }
        const { username, email, password, confirm_password, isadmin } = req.body;
        if (username) {
            user.username = username;
        }
        if (password) {
            if (password.toLowerCase().trim() !== confirm_password.toLowerCase().trim()) {
                return res.status(400).json({ error: 'Password Must Match Confirm Password.', data: undefined });
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
            // return res.status(200).json({ error: undefined, message: 'User Successfully Updated.', data: user });
            res.redirect('/users/');
        }
    } catch (e) {
        res.status(500).json({ error: 'Something Went Wrong. Please Try Again.', data: undefined, e });
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