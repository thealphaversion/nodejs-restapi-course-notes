const EventEmitter = require('events');     //this is a class

const emmitter = new EventEmitter();

// to listen for events
emmitter.on('messageLogged', function() {
    console.log('Listener called');
});

//it takes the name of the event and a callback function

emmitter.on('event', function(arg) {
    console.log('object:', arg)
});


// event listeners should be declared before events because
// when an event occurs, it iterates through the list of 
// already declared event listeners and if we have one after
// the event then it will not find it.


// to raise an event

emmitter.emit('messageLogged');

emmitter.emit('event', {id: 1, url: "url"});

// we can pass additional data with events
// we should encapsulate this data in objects
// { } is an object a.k.a. JSON


// arrow function

emmitter.on('xyz', (arg) => {
    console.log(arg);
});

// => replaces function