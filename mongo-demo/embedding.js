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
    author: {
        type: authorSchema,
        required: true
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

async function updateAuthor(courseId) {
    // one approach
    /*
    const course = await Course.findById(courseId);
    course.author.name = 'New name';
    course.save();
    */
   
    // another approach is
    const course = await Course.update({_id: courseId}, {
        $set: {
            'author.name': 'New name again' 
        }
    });
    course.save();


    // to remove a subdocument, we use the unset operator
    const course = await Course.update({_id: courseId}, {
        $unset: {
            // 'author.name': ''
            // or we can remove the entire subdocument
            'author': ''
        }
    });
    course.save();
}

createAuthor('Aditya', 'Bio', 'Website');

// createCourse('Node course', '5ea5a338d4b7d618771807fa');

// updateAuthor('5ea5a338d4b7d618771807fa');

// listCourses();