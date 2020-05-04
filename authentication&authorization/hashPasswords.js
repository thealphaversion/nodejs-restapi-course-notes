// we will use a very popular library called
// bcrypt

// npm install bcrypt

const bcrypt = require('bcrypt');

// to hash a password effectively, we need a salt

// if we have a password then we get its hash. it is not possible to get the password back from the hash.
// but an attacker can take the most common passwords and can hash it and then match it with the hashed passwords

// a salt is a random string that is added before or after the password so that the resulting hash will be different based on the hash used

async function run() {
    const salt = await bcrypt.genSalt(10);              // the argument is the number of the rounds we intend to run the algorithm to generate the salt
    // the higher the the number, the longer it is going to take to generate the salt and the salt will be more complex and harder to break
    const hash = await bcrypt.hash('password', salt);
    console.log(salt);
}