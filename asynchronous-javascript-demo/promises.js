// A promise is an object that holds the eventual result of an asynchronous operation

// this object can be in one of the 3 states
// pending      at this point it will start some async operation
// fulfilled    async operation completed successfully
// rejected     if we have an error

const p = new Promise(function(resolve, reject) {
    // at this point we'll start some async operation like calling a database etc.
    setTimeout(() => {
        resolve("Data");            // once the async functin finishes executing, 
        // reject(new Error('message'));
    }, 2000);
});

p.then(function (result) {
    console.log('Result', result);
}).catch(function (error) {
    console.log('Error', error);
});


// now we will convert the callbacks from the callbakcs.js file and convert them to promises

console.log("Before");
getUser(1).then((user) => getRepos(user.githubUsername)).catch(err => console.log(err));
console.log("After");


function getUser(id) {
    console.log("Readiang from a database");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({id: id, githubUsername: "thealphaversion"});
        }, 2000);
    });
}

function getRepos(username) {
    console.log("Fetching repos...");
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve(["repo1", "repo2", "repo3"]);
        }, 2000);
    });
}