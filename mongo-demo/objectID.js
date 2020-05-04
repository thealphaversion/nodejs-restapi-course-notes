// the object id in mongo db _id is 24 characters
// each 2 characters represent 1 byte

// hence the _id property is 12 bytes long
    // the first 4 bytes represent the timestamp
    // the next 3 bytes represent the machine identifier
    // the next two bytes represent the process identifier
    // the last 3 bytes represent a counter

// these help us uniquely identify a mongodb document

// although there is very minutely small chance that two documents can have the same id
// this can happen in the following scenario
// we know that 1 byte = 8 bits
// and 3 bits represent a counter
// so the counter can go till 2 ^ 24 ~ approx. 16 million after which it will overflow
// so if we create 16 million documents, at the same time, in the same machine and in the same process,
// only then we can have two documents with the same object id


// in sql databases, we have an autoincrement counter, that gives a unique id to every entry
// but this hurts scalability, as the database has to take the value of the last row and increment it by 1.

// mongodb doesn't do anything of the sort
// the mongodb driver generates the id
// hence we have high scalability with mongodb


// we can also explicitly generate an object id

const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();

// to generate the timestamp from this id, we can do
console.log(id.getTimestamp());


// we can also validate object id
const isValid = mongoose.Types.ObjectId.isValid('asdaf');


// see vidly rental.js line 23 for object id validation

// npm install joi-objectid 
// Joi.objectId = require('joi-objectid')(Joi);

// a better implementation is to move this from every file to index.js so that we load it only once.
