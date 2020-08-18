const express = require('express');
const app = express();

app.use(express.json());        // reads the request and if there is a json object in the body of the request then it
                                // will parse the json object in the request and then it will set the request.body property

/**
 * It has useful methods like
 * .get();
 * .post();
 * .put();
 * .delete();
 * 
 * There correspond to the http requests.
 */

app.get('/', (request, response) => {
    response.send('Hello World!');
});

app.get('/api/courses', (request, response) => {
    response.send([1, 2, 3]);
});

/**
 * We pass parameters to get a single object out of multiple objects
 * To pass parameters to routes we do
 * /api/courses/:param1/:param2
 */

app.get('/api/courses/:courseID/:courseName', (request, response) => {
    response.send(request.params);          // route parameters. these are necessary parameters
    response.send(request.query);           // query parameters. these are optinal, like ?sortBy=name
});

/**
 * To pass query parameters to routes we do
 * /api/courses/:param1/:param2?queryName=valueName
 * 
 * for ex: localhost:3000/api/courses/1/English?sortBy=Name
 */

const courses = [{id : 1, course : 'English'}, {id : 2, course : 'Hindi'}, {id : 3, course : 'Maths'}, {id: 4, course : 'History'}];

app.get('/api/getcourses/:id', (request, response) => {
    let course = courses.find(c => c.id === parseInt(request.params.id));
    console.log(course);
    if(!course) {
        response.status(404).send("404: Course not found!");
    } else {
        response.send(course);
    }
});

/*
Instead of using the arrow function, you can also do the follwing

app.get('/api/getcourses/:id', (request, response) => {
    function findCourse(course) {
        if(course.id === parseInt(request.params.id)) {
            return course;
        }
    }

    let course = courses.find(findCourse);
    console.log(course);
    if(!course) {
        response.status(404).send("404: Course not found!");
    } else {
        response.send(course);
    }
});
*/

app.get('/api/getcourses', (request, response) => {
    response.send(courses);
});


/**
 * Post requests now
 */

app.post('/api/courses', (request, response) => {
    if(!request.body.name || request.body.name.length < 3) {
        // 400 => Bad Request
        response.status(400).send("Name is required and should be minimum 3 letters.")
        return;
    }
    let course = {
        id : courses.length + 1,
        name : request.body.name
    };
    courses.push(course);
    response.send(course);
});







// app.listen(3000, () => console.log('Port 3000...'));

/**
 * Since the value 3000 is hardcoded it is unlikely that this will work in a production environment
 * as over there ports are assigned dynamically and we cannot expect 3000 to be available.
 * 
 * So we make use of the environment variable PORT
 * 
 * we do this using the global object called process.
 * process has a property called env and then the environment variable.
 */

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
