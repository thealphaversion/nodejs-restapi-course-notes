// if we call an async function like a synchronous function then we won't get any data from it because it is not ready then.

// to handle async data, we have 3 methods
// callbacks
// promises
// async/await  => which is basically an extension of promises

// the first method is to use callbacks


/*

console.log("Before");
getUser(1, function(user) {
    console.log('User: ', user);

    // get repos
    getRepos(user.githubUsername, function(repos) {
        console.log(repos);
    });
});
console.log("After");

function getUser(id, callback) {
    console.log("Readiang from a database");
    setTimeout(() => {
        callback({id: id, githubUsername: "thealphaversion"});
    }, 2000);
}

function getRepos(username, callback) {
    console.log("Fetching repos...");
    setTimeout(() => {
        callback(["repo1", "repo2", "repo3"]);
    }, 2000);
}

*/

// now lots of callbacks lead to a deeply nested structure
// this can make the code very complex
// a.k.a. callback hell or the christmas tree problem

// one way to fix this problem is to use named functions instead of anonymous function.t


console.log("Before");
getUser(1, function(user) {
    console.log('User: ', user);

    // get repos
    
});
console.log("After");

function getUser(id, callback) {
    console.log("Readiang from a database");
    setTimeout(() => {
        callback({id: id, githubUsername: "thealphaversion"});
    }, 2000);
}

function getRepos(username, callback) {
    console.log("Fetching repos...");
    setTimeout(() => {
        callback(["repo1", "repo2", "repo3"]);
    }, 2000);
}

function getUser(id) {
    getUser(id, getUser);
}

function getRepos(user) {
    getRepos(user.githubUsername, displayCommits);
}

function displayCommits(repos) {
    console.log(repos);
}