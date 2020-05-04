const mongoose = require('mongoose');

// we use this to connect to mongodb
// mongodb:localhost referes to the mongodb installed locally on our machine
// when in production, we will have a different string for the production environment
// playground here is our database name
mongoose.connect('mongodb://localhost/playground').then(() => {
    console.log("Connected to mongo");
}).catch(() => {
    console.log('error in connection');
});

// in nosql databases, documents in a collection can have variable number of properties
// but in mongoose, we can apply a schema to the documents in a collection

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },     // we could have just used Date as the type, but this implementation allows us to set default values
    isPublished: Boolean
});

/** we can give the following types to properties in a schema:
 * Number
 * String
 * Array
 * Date
 * Boolean
 * Buffer   -   to store binary data
 * ObjectID    -   to store unique identifiers
 */


// now we need to compile the schema into a model
const Course = mongoose.model('courses', courseSchema);        // the first argument is the collection to which the schema is to be applied,
                                                // and the second argument is the schema itself.
                                                // And this returns a class for the model.


async function createCourse() {                                                
    const nodeCourse = new Course({
        name: 'Python Course',
        author: 'Aditya',
        tags: ['python', 'scripting'],
        isPublished: true
    }); 

    // now we have to save this document in the database
    // it will be an asynchronous operation, and the save method returns a promise.

    const result = await nodeCourse.save();
    console.log(result);
}

// createCourse();

async function getCourses() {
    // const courses = await Course.find();
    // we can also filter our results according to the properties
    // we can also sort the results
    // we can apply limits
    // maybe we only want to return the author for the results
    const courses = await Course
    .find({isPublished: false})
    .limit(10)
    .sort({name : 1})          // 1 for ascending, -1 for descending   and we can havev multiple keys here
    .select({author: 1, tags: 1});      // we only get author and tags
    
    
    console.log(courses);
}

// getCourses();


async function getCoursesOperations() {
    /** mongodb has the following comparision operators
     * eq => equal to
     * ne => not equal to
     * gt => greater than
     * gte => greater than or equal to
     * lt => less than
     * lte => less than or equal to
     * in
     * nin => not in
     */

    // lets assume we have a property called price
    // and we want to find courses with price > 10
    const courses = await Course
    .find({price : {$gt: 10}})              // $ sign here indicates that the key is an operator
    .limit(10)
    .sort({name : 1})                       // 1 for ascending, -1 for descending   and we can havev multiple keys here
    // .sort('name')                        // we can also use a string instead of the object, where the string will be the key, so here we can use sort('name') for ascending and sort('-name') for descending
    .select({author: 1, tags: 1});          // we only get author and tags

    // to find couses with price > 10 and <= 20
    const lcourses = await Course
    .find({price : {$gt: 10, $lte: 20}});              // $ sign here indicates that the key is an operator

    // to find couses with price equal to 10, 15 or 20.
    const rcourses = await Course
    .find({price : {$in: [10, 15, 20]}});              // $ sign here indicates that the key is an operator
    
    console.log(courses);
}


// logical operators
// or
// and

async function getCoursesLogical() {
    // find courses authored by Aditya or those that are published
    const courses = await Course
    .find()
    .or([{author: 'Aditya'}, {isPublished: true}]);
    // and logic is similar, we use and() instead of or()
    
    console.log(courses);
}


// filtering with regular expressions
async function getCoursesRE() {
    // find courses with author name as exactly 'Aditya'
    // the syntax for re is 
    // /pattern/    where pattern is the regular expression
    // ^ is used when we want and string starting with something
    // for eg. /^Adi/ represents a string that starts with Adi

    // similarly, for string ending with any string we use /pattern$/
    // for eg. /tya$/ represents a string ending with tya.

    // both of these were case sensitive.
    // to make it case insensitive, we append an i at the end,
    // just like /pattern/i

    // if we want a string that contains a string
    // we use /.*pattern.*/
    // so we can have 0 or more characters before or after the substring that we  supply    
    const courses = await Course.find({author: /^Adi/});
    // and logic is similar, we use and() instead of or()
    
    console.log(courses);
}


async function getCoursesCount() {
    // to count the number of documents in the result
    // we use the count() method   
    const courses = await Course
    .find({author: /^Adi/})
    .count();
    
    console.log(courses);
}


// pagination
async function getCoursesPagination() {
    const pageNumber = 2;
    const pageSize = 10;
    // in a real world application we use query string parameters instead of hardcoding the values
    // like /api/courses?pageNumber=2&pageSize=10

    // we use the skip() method for pagination
    // in order to implement pagination, we need to skip all documents in the previous page
    const courses = await Course
    .find({author: /^Adi/})
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
    
    console.log(courses);rtnojro;gjb
}


// updating documents
// there are two ways of updating documents
// 1. Query First
// we first find the course to be updated
// then we modify it
// and save it

// 2. Update First
// instead of retrieving the document,
// we do to the database and update directly
// and optionally, we can get the updated document as well


// Approach 1: Query First
async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) {
        return;
    }
    course.isPublished = true;
    course.author = 'Another author';

    // instead of updating one by one, we can use the set method
    course.set({
        isPublished: true,
        author: 'Another author'
    });

    const result = await course.save();
}


// Approach 2: Update First
async function updateCourse1(id) {
    // const course = await Course.update({_id: id});                       // we can update all documents with the same id
    // const course = await Course.update({isPublished: false});           // we can update all courses that are not published
    // this way we can update many documents in one go
    
    // if we want to update document directly, we can do this by
    const result = await Course.update({_id: id}, {
        $set: {
            author: 'aditya',
            isPublished: true
        }
    });
}


// if we want to retrieve the document while that is to be updated, we can use findByIdAndUpdate()
async function updateCourse2(id) {
    const result = await Course.findByIdAndUpdate({_id: id}, {
        $set: {
            author: 'aditya',
            isPublished: true
        }
    });
    // this will  return the orignal document and update it


    // to get the updated document
    result = await Course.findByIdAndUpdate({_id: id}, {
        $set: {
            author: 'Hello',
            isPublished: true
        }
    }, {new: true});
}



// to remove a document from the database
async function removeCourse(id) {
    const result = await Course.deleteOne({_id: id});
    // this method will delete the document with id

    // if we pass
    result = await Course.deleteOne({isPublished: true});
    // this will only delete the first document that it encounters that has isPublished: true

    console.log(result);

    // to delete multiple documents, use deleteMany
    result = await Course.deleteMany({isPublished: true});

    // to get the document that is deleted, we can use findByIdAndRemove()
    result = await Course.findByIdAndRemove({_id: id});
    // if we don't have a course with the id, this will return null
}



// continued in validation.js