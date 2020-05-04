// lets say only admins can delete stuff

// first in the user model,
// have a property

isAdmin: Boolean

// then add the property to the json web token payload

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}


// then
// make a middleware to see if the user is admin or not

// in the middleware directory
// make a file 'admin.js'

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // the auth middleware is executed before this
    // so it gives us the req.user object

    if (!req.user.isAdmin) {
        // 401: Unauthorised
        // 403: Forbidden

        return res.status(403).send('Access denied.');
    }

    next();
}

// then we apply this middleware to the routes that we to protect

// we pass an array of middleware functions
// they will be executed in order
router.delete('/:id', [auth, admin], async (request, response) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) {
        response.status(404).send("404: Genre not found!");
        return;
    }
    response.send(genre);
});