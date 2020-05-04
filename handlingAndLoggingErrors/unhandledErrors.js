// ************* unhandled error ******************
// the error middleware catches errors that are part of the request response pipeline

// any error thrown outside of the context of the pipeline
// will not be handled by our error handlers and cannot be logged by winston

// we have to handle those outside of express
// we will handle them in a node process
// the process object is an event emitter           (an event emitter is an object that can emit or publish events)
// and it has a method 'on' that we use to subscribe to an event

// in node we have a standard event called uncaught exception
// this event is raised when we have an exception in the node process
// but nowhere we have handled the exception using a catch block

process.on('uncaughtException', (ex) => {
    console.log('Caught an unhandled excepion.');
    winston.error(ex.message, ex);
});

// however this only works with synchronous code
// so if there is a promise that has an error that is not handled,
// then this will not work

// to handle that we move onto 

// ************* unhandled promise rejection ******************

// the process object has another event called unhandledRejection and we can subscribe to it

// similar to the above

process.on('unhandledRejection', (ex) => {
    console.log('Caught an unhandled promise rejection.');
    winston.error(ex.message, ex);
});


// as a best practice, once we catch an unhandled exception or promise rejection,
// we should terminate the process and restart it
// because it might have left our application in an unclean state
// so restarting should help us start from a clean state

process.on('uncaughtException', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
});

process.on('unhandledRejection', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
});


// another way to do this is to use a helper function called 'handleExceptions' in winston
// and we have to pass one or more transport objects
winston.handleException(new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

// winston only has a helper function to handle exception, not promise rejections

// one work around is to throw an exception whenever a promise rejection occurs
process.on('unhandledRejection', (ex) => {
    throw ex;
});
// this will be handled by the code above


// here we are storing the log in a file,
// we can also store it in mongodb

// both transports have their pros and cons
// when we might need to query through the logs,
// mongodb is a better choice than a file
// but mongodb server might go down sometimes
// and the file will always be available