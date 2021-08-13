const mongoose = require('mongoose');
const chalk = require('chalk');

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/beefup-db', {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (e) {
        console.log(e);
    }
};
connect();