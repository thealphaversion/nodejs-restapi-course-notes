// we would be using an npm package called winston to log errors

// npm install winston
// in index.js import winston
// const winston = require('winston');

// here winston is our logger object
// a logger object has what we call a Transport
// a Transport is escentially a storage device for our logs

// winston comes with a few core transports
// 1. Console => for logging messages on the console
// 2. File => for logging messages to a file
// 3. Http => for calling an http endpoint for loggin messages

// there are some plugins available for logging messages on
// 1. MongoDB
// 2. CouchDB
// 3. Redis
// 4. Loggly => for log analysis

// the default transport comes with one transport
// that is logging messages on the console

// to log messages in a file
winston.add(winston.transports.File, { filename: 'logfile.log' });


// now to log the errors
// in error.js in middleware

const winston = require('winston');

module.exports = function(err, req, res, next) {
    // winston.log();      // to log the error
    
    // we pass a logging level as parameter
    // it determines the importance of message to be logged
    // in decreasing order of level
    // error (which is the most important)
    // warn (for warning)
    // info (for storing information like connected to mongodb)
    // verbose
    // debug
    // silly
    // we can either pass the parameter as
    winston.log('error', err.message);          // by passing the level as a string
    // or
    winston.error(err.message);                 // by using the helper functions so that we don't need to supply a string

    // optionally, we can also store metadata
    winston.error(err.message, err);
    // all the data about the error will be stored

    response.status(500).send('A failure occured');
}

// this logs messages to a logfile.log


// to log messages to mongodb
// we install another npm package
// npm install winston-mongodb@3.0.0

// load winston-mongdb in index.js
// we don;t need to store it in a constant

require('winston-mongodb');

// and add
winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly' });

// we can also set the level for a transport

// if we only want to log errors to mongodb, then
winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/vidly',
    level: 'error'
});

// if we set the level to info,
// then error, warn and info will be logged
