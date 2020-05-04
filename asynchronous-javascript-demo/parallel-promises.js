// sometimes we want to execute two promises in parallel
// like calling two apis at once

// let's simulate

const p =new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 1');
        resolve(1);
    }, 2000);
});

const q =new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2');
        resolve(2);
    }, 2000);
});

// to eecute them parallely, we use the .all() method

// we pass an array of promises as parameter
// this method will return a promise that will be resolved
// when all the promises in the array are resolved

Promise.all([p, q]).then(result => console.log(result));

// both the promises are done almost at the same time
// this is not "really" runnning in parallel, i.e. it does
// not have multi-threading
// we only have a single thread, but that single thread is running multiple promises

// we are not waiting for the result of the first async operation to start the sencond one.
// This is what we mean by "parallel" here.

// We get an array as the result here.
// If any one of the promises is rejected, then the entire result is rejected.


// Another method is 
Promise.race([p, q]).then(result => console.log(result));

// in this, if any one of the promises is resolved, then the value of that promise is returned
