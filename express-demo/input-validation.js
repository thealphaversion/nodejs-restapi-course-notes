const Joi = require('joi');
const express = require('express');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;


const courses = [{id : 1, name : 'EM1'}, {id : 2, name : 'EM2'}, {id : 3, name : 'EM3'}, {id : 4, name : 'EM4'}]

app.post('/validation-testing', (request, response) => {
    const schema = {name : Joi.string().min(3).required()};
    const result = Joi.validate(request.body, schema);
    
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

function listeningCallback() {
    console.log(`Listening on port ${port}...`);
}

app.listen(port, listeningCallback);
