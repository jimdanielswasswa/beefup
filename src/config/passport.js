const LocalStrategy = require('passport-local').Strategy;
const User = require('../db/models/User');

const initPassport = (passport) => {
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try{
            const user = await User.findByCredentials(username, password);
            return done(null, user);
        } catch(e){
            return done(null, false, { message: 'Invalid Credentials.' });
        }
    }
  ));
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
        if(user){
            done(null, user);
        } else {
            done('User Not Found', undefined); 
        }
  });
};

module.exports = initPassport;