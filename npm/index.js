var _ = require('underscore');

// First node assumes underscore is core library
// if not
// then node assumes it is a file or a folder in the same directory
// if not
// then node assumes that underscore is in the node_modules directory

let result = _.contains([1, 3, 5, 7], 4);

console.log(result);