// sometimes we need to use promises that are already resolved
// like in unit tests

// a resolved promise i scall by

const p = Promise.resolve({id:1});
p.then((id) => console.log(id));

const e = Promise.reject(new Error("Message"));
e.catch((err) => console.log(err));
