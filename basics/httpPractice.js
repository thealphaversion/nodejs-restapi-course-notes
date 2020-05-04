/*

const http = require('http');

const server = http.createServer();

var num = 33;

server.on('connection', (socket) => {
    console.log(`New Connection $num...`);
});

console.log("Listening on port 3000...");

server.listen(3000);

*/

const http = require('http');

const server = http.createServer(function(request, response){
    if(request.url === '/numbers') {
        response.write(JSON.stringify([1, 2, 3]));
        response.end();
    }

    if(request.url === '/') {
        response.write('Hello World!');
        response.end();
    }
});

server.listen(3000);

console.log("Listening on port 3000...");