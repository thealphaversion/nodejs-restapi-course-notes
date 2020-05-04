const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => { console.log("Connected...") })
    .catch(() => { console.log('Error...') });

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: [authorSchema]
}));

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);
}

// this will add an author to the array of authors

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

// thsi will remove an author from the array of authors

async function addAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
}

// createCourse('Node course', '5ea5a338d4b7d618771807fa');

//createCourse('Node Course', [new Author({name: 'abcd'}), new Author({name: 'bcds'})]);