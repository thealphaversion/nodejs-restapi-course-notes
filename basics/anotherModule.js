const EventEmitter = require('events');

class Logger extends EventEmitter{
    another(name) {
        this.emit('logging', {id: 324, message: "User is loggging in"});
        console.log("My name is " + name + ".");
    }
}

module.exports = Logger;