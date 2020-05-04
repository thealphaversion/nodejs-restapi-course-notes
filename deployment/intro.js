// two ways of deploying
// using a PaaS
// docker


// in the PaaS space, we have a lot of options, some of which are
// Heroku
// GCP
// AWS
// Azure 


// preparing the app for production

// before deploying, we download a couple of packages

// the first one is helmet
// helemt is a middleware package that can protect our application from well known web vulnerabilities
// npm install helmet


// the other package we want to install is compression
// we want to compress the http response that we send to the client

// npm install compression


// in the startup directory, add a new module called prod.js
// all the middleware required for the production environment are to be added here

const helmet = require('helmet');
const compression = require('compression');

module.exports = function(app) {
    app.use(helmet());
    app.use(compression());
}

// now we call this in index.js

require('./startup/prod')(app);
// we can also write code to conditionally use this module