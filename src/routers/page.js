const express = require('express');
const { relativeTimeRounding } = require('moment');
const auth = require('../middlewares/auth');

const router = new express.Router();

router.get('/pages/', auth, (req, res) => {});
router.get('/pages/:id', auth, (req, res) => {});
router.post('/pages/', auth, (req, res) => {});
router.patch('/pages/:id', auth, (req, res) => {});
router.delete('/pages/', auth, (req, res) => {});

module.exports = router;