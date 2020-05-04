// a json web token is a long string that identifies a user

// when the user logs on to the server
// it is returned a json web token (jwt)
// then next time the client requests an api,
// it has to produce the jwt


// a jwt can be decoded to get the json object
// a jwt has 3 parts

// part 1 is the header of the jwt
// in it we have the algorithm used to decode the token and the type, i.e. jwt

// part 2 is the payload
// the payload includes the public properties of the json object

// part 3 is the digital signature
// it is created on the basis of the content of the token
// along with a secret or private key
// this secret or private key is only available on the server


// to generate jwt

// npm install jsonwebtoken

const jwt = require('jsonwebtoken');
const token = jwt.sign({ _id: user._id }, 'privatekey');

// we pass a payload as parameter
// a payload can be a simple string or an object
// never hardcode or store private key here.
// use an environment variable to store the private key 

// our payload has a property call 'iat'
// this is the time when the token was created
// this helps us determine the age of a token


// we will use the config package to store our secrets
// here, private key, in the environment variables

// npm install config
// create a directory called config in your project, if it doesn't exist already
// create a file 'default.json'
// we can store many properties

{
    jwtPrivateKey: ""
}

// we set it to an empty string, the actual value is not here
// here we are just defining the template for all our settings in the application

// create another file 'custom-environment-variables.json'

// we want to map this setting to
{
    jwtPrivateKey: "vidly_jwtPrivateKey"
}
// prefix the jwtPrivateKey so that one application setting doesn't end up overwriting another application setting


// in index.js
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);        // 0 means success, anything oother than 0 is failure
}


// now we set the environment variable
// for mac and linux: use export
// for windows: use set

// export vidly_jwtPrivateKey=myKey
// or
// set vidly_jwtPrivateKey=myKey




// setting headers

// let's assume when people register, then they are automatically logged in
// returning the token along with the other properties can get too cluttering

// so we send the token in the http header
response.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
// always prefix custom headers with x-



// a problem now is
const token = jwt.sign({ _id: user._id }, 'privatekey');
// we have this line of code in multiple places
// and if we want to someday add more properties to the payload,
// then we will have to remember to change the same in multiple places


// one approach is to create a function and import that function wherever we need
function generateAuthToken() {
    const token = jwt.sign({ _id: user._id }, 'privatekey');
    return token;
}
// but this is not a very good approach


// in Object Oriented Programming, we have a principle called
// Information Expert Principle
// this means that an object that has enough information and is an expert in a given area,
// that object should be responsible for making decisions and performing tasks.

// so in our code, we want to add more properties to the payload,
// and all those properties are available in the user object
// so it is the user object that should be responsible for generating the auth token
// so the generateAuthToken method should be a method in the user object

// so we have to make a change to the user model

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 2048   
    }
});

const User = mongoose.model('User', userSchema);


