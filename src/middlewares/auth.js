const jwt = require('jsonwebtoken');

const auth_middleware = (req, res, next) => {
    console.log('lllll\n Here \nllllll');
    // try {
    // const decoded = jwt.verify(req.token, 'beefup-secret-key');
    // const user = User.findOne({ _id: decoded._id, 'tokens.token': req.token });
    // if (!user) {
    //     throw new Error();
    // }
    // req.auth_user = user;
    if (req.isAuthenticated()) { 
        return next();
    }
    req.session.error = 'Please sign in!';
    // if(req.user.authenticated){
    //     next();
    // }
    res.redirect('/login/');
    // } catch (e) {
    //     res.status(401).send('Login Required.');
    // }
};

module.exports = auth_middleware;