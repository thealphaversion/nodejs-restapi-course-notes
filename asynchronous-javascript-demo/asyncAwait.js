// similar to C# and dart

function getUser(id) {
    console.log("Reading from a database");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({id: id, githubUsername: "thealphaversion"});
        }, 2000);
    });
}

// to get the result of the promise, we will await it

const value = await getUser(1);


// we use the async keyword when we have a function with the await keywords

async function display() {
    const value = await getUser(1);
}

// we don't have the catch method here.
// so put async code inside a try - catch block

function rejectUser(id) {
    console.log("Reading from a database");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("No user"));
        }, 2000);
    });
}

async function displayRejected() {
    try {
        const value = await rejectUser(1);
    } catch (err) {
        console.log("Error:", err)
    }
    const value = await rejectUser(1);
}