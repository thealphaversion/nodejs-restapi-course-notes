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

app.delete('/delete-course/:id', (request, response) => {
    // First look pu the course
    // if not found, return 404
    let course = courses.find(c => c.id === parseInt(request.params.id));
    if(!course) {
        response.status(404).send("404: Course not found!");
        return;
    }

    // Delete

    // first we have to find the index of the course we want to remove
    let index = courses.indexOf(course);

    // then we use the splice method to delete the course
    courses.splice(index, 1);
    
    // Return the course
    response.send(course);
});

function listeningCallback() {
    console.log(`Listening on port ${port}...`);
}

app.listen(port, listeningCallback);
