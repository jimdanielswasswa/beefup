const mongoose = require('mongoose');
const chalk = require('chalk');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/beefup-db', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (error) => {
    if(error){
        chalk.red('Failed to connect to the database. Please try again later.')
    } else {
        chalk.green('Connection Successful.');
    }
});