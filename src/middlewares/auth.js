const jwt = require('jsonwebtoken');
const User = require('../db/models/User');

const auth_middleware = async(req, res, next) => {
        if(req.isAuthenticated()){
            req.badUrl = false;
            return next();
        }
        res.redirect('/login');
};

module.exports = auth_middleware;