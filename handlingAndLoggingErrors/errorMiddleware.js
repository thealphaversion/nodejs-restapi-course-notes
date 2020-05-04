// in express, we have a special middleware called error middleware

// we register this middleware function after all other middleware functions

app.use(function(err, req, res, next) {                                 // err is the exception that we catch somewhere in the application
    // in this function, we put all the error handling logic
    // we use 500 => internal server error
        // to signify something failed on the server
        response.status(500).send('A failure occured');
});

// and we call it in the catch block
router.get('/', async (request, response, next) => {
    try {
        const genres = await Genre.find().sort('title');
        response.send(genres);
    } catch (ex) {
        // in the catch block, we want to pass control to our error handling middleware
        // so we pass another parameter'next' to pass control to the next middleware, i.e. the error handling middleware
        next(ex);
    }
});

// the problem here is that we have to put try-catch blocks everywhere
// this is adding noise to our implementation

// we should move this to a single function
function asyncMiddleware(handler) {
    try {
        // only this part is different for different route handlers
        // so why don't we pass a route handler as parameter
    } catch(ex) {
        next(ex);
    }
}

// so now we don't need the try catch block in the route handler
// and also the next parameter

router.get('/', async (request, response) => {
    const genres = await Genre.find().sort('title');
    response.send(genres);
});

// so now we get this
async function asyncMiddleware(handler) {
    try {
        // we need to pass the request and response objects as parameters
        // because the route handler needs it
        // but nowhere have we defined the request and response objects
        await handler();            // since handler will be an async function
    } catch(ex) {
        next(ex);
    }
}

router.get('/', asyncMiddleware(async (request, response) => {
    // the issue here is that we are calling the function asyncMiddleware,
    // and not passing a reference, because express will call this function not us

    const genres = await Genre.find().sort('title');
    response.send(genres);
}));

// so we need to make a small change in the function

function asyncMiddleware(handler) {
    return async (request, response, next) => {
        try {
            await handler(request, response);            
        } catch(ex) {
            next(ex);
        }
    };
}

// and

router.get('/', asyncMiddleware(async (request, response) => {
    // the issue here is that we are calling the function asyncMiddleware,
    // and not passing a reference, because express will call this function not us

    const genres = await Genre.find().sort('title');
    response.send(genres);
}));

// now we put it in a module
// and do this for all route handlers



// while this is all well and good,
// this has one problem, (yes again)
// and that is the fact that
// we have to remember to call it everywhere

// another approach is use an npm module
// that will monkeypatch our route handlers at runtime

// when we send a request to an endpoint,
// the module will wrap the route handler code inside
// something like what we did above


// npm install express-async-errors
// import it in index.js
// because we need it when the application starts

// require('express-async-errors'); 
// we don't need to store the result in a constant

// and now remove all calls to asyncMiddleware