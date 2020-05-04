// in integration test, we test our code along with external resources as a whole

// to write an integration test, we need a real database that we need to populate with test data
// we send a n http request to an endpoint we wanna test
// and then making an assertion
// this assertion can inspect the response or the database

// integration test
// add the verbose flag to the test property in package.json
// this helps in troubleshooting as jest will print extra information that can help

// now the database we want to use should be different from our production and development database
// because we don't want to mess up our production and development database

// in default.json, add a new key and set it to  our default mongodb connection string
// "db" : "mongodb://localhost/vidly"
// and in test.json
// "db" : "mongodb://localhost/vidly_tests"

// in /startup/database.js we will now dynamically read the connection string based on the environment our app is running
const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
    mongoose.connect(config.get('db')).then(() => {
        winston.info("Connected to mongo");
    });
}


// npm install supertest --save-dev

// change app.listen(port, () => winston.info(`Listening on port ${port}...`));
// to
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;

// we do this so that we can use this server for running our integration tests