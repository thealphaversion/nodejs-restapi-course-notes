
// { see project-vidly/middleware/auth.js }

// there we haev defined a middleware

// some of our api end points should not be protected
// like registering
// so we want to selectively apply the middleware to our end points

// so wherever we need the middleware,
// like

const auth = require('../middleware/auth');

// here the first parameter is the route,
// the second is (optionally) the middleware
// the third is the route handler
router.post('/', auth, async (request, response) => {
    let result = validateRequest(request.body)
    if(result.error) {
        response.status(400).send(result.error.details[0].message);
        return;
    }

    let genre = new Genre({ title: request.body.title });

    genre = await genre.save();
    response.send(genre);
});