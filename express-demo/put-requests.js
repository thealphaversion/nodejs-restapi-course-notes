const Joi = require('joi');
const express = require('express');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;


const courses = [{id : 1, name : 'EM1'}, {id : 2, name : 'EM2'}, {id : 3, name : 'EM3'}, {id : 4, name : 'EM4'}]

function validateCourse(course) {
    const schema = {name : Joi.string().min(3).required()};
    return Joi.validate(course, schema);
}

app.post('/validation-testing', (request, response) => {
    const result = validateCourse(request.body);
    
    if(result.error) {
        // 400 => Bad Request
        response.status(400).send(result.error.details[0].message);
        return;
    }

    let course = {id : courses.length + 1, name : response.body.name};
    courses.push(course);
    response.send(course);
});

/**
 * To test use curl
 * 
 * curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "New course"}' http://127.0.0.1:3000/validation-testing
 */


// Update resources using PUT requests

app.put('/update-courses/:id', (request, response) => {
    // First look pu the course
    // if not found, return 404
    let course = courses.find(c => c.id === parseInt(request.params.id));
    if(!course) {
        response.status(404).send("404: Course not found!");
        return;
    }

    // Then validate
    // if invalid, return 400

    // const result = validateCourse(request.body);
    /**
     * We only need the error property of result
     * So we can use object restructuring
     * 
     * it is demonstrated here.
     */

    const { error } = validateCourse(request.body);
    console.log(error);
    if(error) {
        // 400 => Bad Request
        response.status(400).send(error.details[0].message);
        return;
    }

    // Update course
    // return updated course
    course.name = request.body.name;
    response.send(course);
    console.log(courses);
});

function listeningCallback() {
    console.log(`Listening on port ${port}...`);
}

app.listen(port, listeningCallback);
