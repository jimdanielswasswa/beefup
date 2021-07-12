const express = require('express');
const auth = require('../middlewares/auth');
const User = require('../db/models/User');

const router = new express.Router();

router.get('/users/', auth, async (req, res) => {
    console.log('uuuuuuu\n Here \n uuuuuuuuuuuuuu');
    if (req.user.isadmin) {
        const users = await User.find({});
        if (((!users) || (users.length <= 0))) {
            res.status(404).json({ error: "No Users Found.", data: undefined });
        }
    } else {
        res.status(403).json({ error: 'Insufficient Rights.' });
    }
    res.status(200).json({ error: undefined, data: users });
});
router.get('/users/:id', auth, async (req, res) => {
    const userId = (req.params.id) ? req.params.id.trim() : 0;
    const user = await User.findById(userId);
    if (!user) {
        res.status(404).json({ error: 'User Not Found', data: undefined });
    }
    res.status(200).json({ error: undefined, data: user });
});
router.post('/users/', async (req, res) => {
    const { username, password, confirm_password, email, isadmin } = req.body;    
    try {
        if (!username) {
            res.status(400).json({ error: 'Username Is Required.', data: undefined });
        } else {
            const existing = await User.findOne({ username });
            if (existing) {
                res.status(400).json({ error: 'Username Taken.', data: undefined });
            }
        }
        if (!password) {
            res.status(400).json({ error: 'Password Is Required.', data: undefined });
        } else {
            if (password.toLowerCase().trim() !== confirm_password.toLowerCase().trim()) {
                res.status(400).json({ error: 'Password Must Match Confirm Password.', data: undefined });
            }
        }
        if (!email) {
            res.status(400).json({ error: 'Email Is Required.', data: undefined });
        }
        let user = new User({ username, password, email, isadmin: Boolean(isadmin) });
        user = await user.save();
        res.status(201).json({ error: undefined, data: user });
    } catch (e) {
        res.status(500).json({ error: e.message, data: undefined, e, d: req.body });
    }
}, (error) => {
    res.status(500).json({ error });
});
router.patch('/users/:id', auth, async (req, res) => {
    try {
        const userId = (req.params.id) ? req.params.id.trim() : 0;
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'User Not Found.', data: undefined });
        }
        const { username, email, password, confirm_password, isadmin } = req.body;
        if (username) {
            user.username = username;
        }
        if (password) {
            if (password.toLowerCase().trim() !== confirm_password.toLowerCase().trim()) {
                res.status(400).json({ error: 'Password Must Match Confirm Password.', data: undefined });
            }
            user.password = password;
        }
        if (email) {
            user.email = email;
        }
        if(isadmin == true || isadmin == false){
            user.isadmin = isadmin;
        }
        await user.save();
        res.status(200).json({ error: undefined, data: user });
    } catch (e) {
        res.status(500).json({ error: 'Something Went Wrong. Please Try Again.', data: undefined, e });
    }
});
router.delete('/users/:id', auth, async (req, res) => {
    try {
        const userId = (req.params.id) ? req.params.id : 0;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            res.status(404).json({ error: 'User Not Found', data: undefined });
        }
        res.status(200).json({ error: undefined, data: user });
    } catch (error) {
        res.status(500).json({ error: 'Something Went Wrong. Please Try Again.', data: undefined });
    }
}, (error) => {
    res.status(500).json({ error });
});

module.exports = router;