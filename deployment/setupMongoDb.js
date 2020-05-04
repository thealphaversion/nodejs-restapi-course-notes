// on the heroku dashboard,
// in the resources tab
// you can see add-ons

// the add on that we'll use is mLab MongoDB
// this requires you to have credit card data
// in your cli
// heroku addons:create mongolab:sandbox
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/your-app-name');




// @deprecated {
// alternatively, go to mLab.com and create a free account
// once all that is done
// + create new
// use any cloud provider
// set it up
// }
// this does not allow new account creation anymore
// :(

// once you create the database, you have to create a user
// now on the top of the page, we will have our mongodb connection string (the uri)

// it has username and password, we should store this as an environment variable

// now in our config module,
// in custom-environment-variables.json
// add a key-value pair
// "db": "vidly_db"

// now in our terminal we need to set an environment to our mongodb connection string
// use the connection string from mLab

// now that our souce code is changed, we need to re deploy our application