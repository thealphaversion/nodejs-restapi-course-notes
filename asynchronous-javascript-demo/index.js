// In synchronous or blocking programming,
// the second statement has to wait until the first statement 
// has completed execution


console.log("Before");

// simulating a database action of reading a user from database taht will take 2 seconds
setTimeout(() => {
    console.log("Reading user from database...");
}, 2000);

// setTimeout is an asynchrounous non-blocking function

console.log("After");


// in this program there is no multithreaing. there is only a single thread.
// the program reads the first message, then goes to the setTimeout method where it schedules the enclosing
// body to be called after 2000 ms.
// then program control is given back and "after" executes.
// then 2 seconds later, the scheduled body is executed.