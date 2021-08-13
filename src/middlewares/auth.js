const jwt = require('jsonwebtoken');
const User = require('../db/models/User');

const auth_middleware = async(req, res, next) => {
    // try {        
        // const token =  req.headers.authorization.split(' ')[1];
        const token = req.cookies.token;
        const decoded = jwt.verify(token, 'beefup-secret-key');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        next();
        // if (req.isAuthenticated()) { 
        //     return next();
        // }
        // req.session.error = 'Please sign in!';
        // if(req.user.authenticated){
        //     next();
        // }
        // res.redirect('/login/');
    // } catch (e) {
    //     res.status(401).json('Login Required.');
    // }
};

module.exports = auth_middleware;