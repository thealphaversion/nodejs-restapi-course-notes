// our index.js is cluttered
// with different code different functions all mixed up together

// first we move our routes to seperate module

module.exports = function() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));

    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);

    app.use(error);
}

// we have a dependency on app
// but we wnat to have 1 instance of the app object throughout the application
// so we need to send a reference of our app object in index.js
// to the routes module

// so we pass app as an argument

module.exports = function(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));

    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);

    app.use(error);
}

require('./startup/routes')(app);