const express = require('express');
const auth = require('../middlewares/auth');

const router = new express.Router();

router.get('/menu-items/', auth, (req, res) => {});
router.get('/menu-items/:id', auth, (req, res) => {});
router.post('/menu-items/', auth, (req, res) => {});
router.patch('/menu-items/:id', auth, (req, res) => {});
router.delete('/menu-items/:id', auth, (req, res) => {});

module.exports = router;