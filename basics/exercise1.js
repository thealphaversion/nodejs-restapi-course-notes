const nameFunc = require('./newModule');
const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('logging', (arg) => {
    console.log("Event : logging, Data : ", arg);
});


emitter.emit('logging', {id: 324, message: "User is loggging in"});
nameFunc.nameFunction("Aditya");