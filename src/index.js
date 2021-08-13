const path = require('path');
const express = require('express');
const chalk = require('chalk');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const moment = require('moment');
// const session = require('express-session');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

require('./db/mongoose');
const auth_router = require('./routers/auth');
const app_router = require('./routers/app');
const user_router = require('./routers/user');
const menu_item_router = require('./routers/menu-item');
const page_router = require('./routers/page');
const service_item_router = require('./routers/service-item');
const reservations_router = require('./routers/reservations');

const app = express();
const PORT = process.env.PORT || 3000;
const public_dir = path.join(__dirname, '../public');
const views_dir = path.join(__dirname, '../templates/views');
const partials_dir = path.join(__dirname, '../templates/partials');

// app.use(session({ 
//     secret: 'beefup-secret-key',
//     resave: true,
//     saveUninitialized:false
//  }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.serializeUser((user, done) => {
//     done(null, user._id);
// });
// passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//         done(err, user);
//     });
// });
// passport.use('local-signin', new LocalStrategy({passReqToCallback : true},
//     async (req, username, password, done) => {
//         console.log('xxxxxxxxxxx\n Here \nxxxxxxxxxxxxxxxxxxx');
//         try {
//             const user = User.findByCredentials(username, password);
//             if (!user) {
//                 return done(undefined, false, { message: 'Invalid Credentials.' });
//             }
//         } catch (e) {
//             return done(e);
//         }
//         return done(undefined, user);
//         //   User.findOne({ username: username }, function(err, user) {
//         //     if (err) { return done(err); }
//         //     if (!user) {
//         //       return done(null, false, { message: 'Incorrect credentials.' });
//         //     }
//         //     if (!user.validPassword(password)) {
//         //       return done(null, false, { message: 'Incorrect credentials.' });
//         //     }
//         //     return done(null, user);
//         //   });
//     }
// ));
app.set('view engine', 'hbs');
app.set('views', views_dir);
hbs.registerPartials(partials_dir);
app.use('/static', express.static(public_dir));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
hbs.registerHelper('_increment', (value) => {
    return (parseInt(value) + 1);
});
hbs.registerHelper('_toLongDate', (value) => {
    return moment(value).format('MMMM Do YYYY, h:mm:ss a');
});
hbs.registerHelper('_divideby100', (value) => {
    return parseFloat(parseFloat(value) / 100)
});
hbs.registerHelper('_not', (value) => (!value));
app.use(auth_router);
app.use(app_router);
app.use(user_router);
app.use(menu_item_router);
app.use(page_router);
app.use(service_item_router);
app.use(reservations_router);

app.listen(PORT, (err) => {
    if (err) {
        chalk.redBright(`Failed to establish a connection to port: ${PORT}.`);
    } else {
        chalk.greenBright(`Connected to port:${PORT}`);
    }
});