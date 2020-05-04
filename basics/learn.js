console.log("Hello World");

// require is used to load modules
var http = require("http");

// require returns the object exported from the target module
var nameFunc = require("./newModule");

// it is good practice to set the imported modules as a constant
// instead of a variable, so that we do not accidentally overwrite it

const nameFunc = require("./newModule");

nameFunc.nameFunction("Aditya");

// use ../ for the parent directory
// use ./subfolder/ for a sub directory
// use ./ for current directory

//console.log(http);

/*
http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type' : 'text/plain'});
}).listen(8081);
*/

console.log("Server running at http://127.0.0.1:8081/");

