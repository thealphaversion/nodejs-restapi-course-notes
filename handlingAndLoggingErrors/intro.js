// if using promises with the .then() method, then always follow this with a .catch() method

// if awaiting promises, always put it in a try catch block

// an example
router.get('/', async (request, response) => {
    try {
        const genres = await Genre.find().sort('title');
        response.send(genres);
    } catch (ex) {
        // Log the exception
        // we use 500 => internal server error
        // to signify something failed on the server
        response.status(500).send('A failure occured');
    }
});

// one problem with the current implementation is that,
// if we ever want to change the error message,
// we will have to go to every try catch block,
// with this message and change it indivisually 

// also if we want to change how we log the exception,
// we will have to do the same.
// so we want to move the handling logic to somewhere central
// so that if we want to make a change, we have to make it once