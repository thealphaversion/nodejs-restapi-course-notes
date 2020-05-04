const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => { console.log("Connected...") })
    .catch(() => { console.log('Error...') });

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    });
    const result = await author.save();
    console.log(result);
}

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course
        .find()
        .populate('author', 'name -_id')                // this is used to load the reference from the object ID, the first parameter is the prperty that is referenced
                                                        // the second parameter are the sub properties that you want to inlude or exclude
        .select('name author');
    
    console.log(courses);
}

createAuthor('Aditya', 'Bio', 'Website');

// createCourse('Node course', '5ea5a338d4b7d618771807fa');

// listCourses();