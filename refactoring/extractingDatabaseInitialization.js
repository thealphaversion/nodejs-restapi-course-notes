// similar to routes, we move database initialization code to startup/database.js

module.exports = function() {
    mongoose.connect('mongodb://localhost/vidly').then(() => {
        console.log("Connected to mongo");
    }).catch(() => {
        console.log('error in connection');
    });
}

// we should remove the console.log lines and rather log it as an info with winston

// and we'll remove the catch method and let our global error handler deal with the rejected promise

module.exports = function() {
    mongoose.connect('mongodb://localhost/vidly').then(() => {
        winston.info("Connected to mongo");
    });
}