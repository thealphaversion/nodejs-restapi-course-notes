import { userInfo } from "os";

// example snippet

/*
    router.post('/', async (request, response) => {
        let result = validateUser(request.body)
        if(result.error) {
            response.status(400).send(result.error.details[0].message);
            return;
        }

        let user = await User.findOne({ email: request.body.email });

        if (user) {
            return response.status(400).send('User already registered.');
        }

        user = new User({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
        });

        await user.save();
        response.send(user);
    });
*/

// this snippet will also return the password of the user in the response
// we don't want that
// so we must modify the response to the client
// there are two approaches
// 1. Return a custom object like this
    response.send({
        name: userInfo.name,
        email: userInfo.email
    });

// 2. Another option is using Lodash
// npm install lodash

// const _ = require('lodash');


user = new User(_.pick(request.body, ['name', 'email', 'password']));       // this way we would only store those properties that we want and no malicious user can send random properties to be stored

await user.save();

response.send(_.pick(user, ['name', 'email']));



// to enforce password complexity, there is an npm package available
// called joi-password-complexity
