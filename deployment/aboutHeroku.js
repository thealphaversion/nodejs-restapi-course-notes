// in heroku, we have one server, which is called a dyno

// if we want to scale our applicaion, we need to add more dynos
// these dynos have a temporary file system
// i.e. every time you restart it, the file system is wiped out
// so you cannot store data there.

// to use storage, there are various addons available

// the only thing that all these dynos share are these environment variables