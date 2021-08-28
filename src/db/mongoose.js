const mongoose = require('mongoose');
const chalk = require('chalk');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/beefup-db';

const connect = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (e) {
        console.log(e);
    }
};
connect();

module.exports = MONGODB_URI;