const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground').then(() => {
    console.log("Connected to mongo");
}).catch(() => {
    console.log('error in connection');
});

// if we create a document with none of the values in the schema, it is still a valid document to mongodb
// it doesn't matter if there are some fields missing, or extra fields

// he we must validate data

const courseSchema = new mongoose.Schema({
    name: {type: String, required: true},               // this sets this property as required and is only valid in mongoose, mongodb still doesn't care XD
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

// trying to save a document with a missing property that is required,
// we will get an UnhandledPromiseRejectionException

// to handle the exception, we'll put the code is a try-catch block

const Course = mongoose.model('courses', courseSchema);

async function createCourse() {                                                
    const nodeCourse = new Course({
        name: 'Python Course',
        author: 'Aditya',
        tags: ['python', 'scripting'],
        isPublished: true
    });

    try {
        const result = await nodeCourse.save();         // at the time of running, mongoose automatically validates the document
        // to validate the document explicitly,
        // we can do
        /*
        nodeCourse.validate((err) => {
            if (err) {
                // some code
            }
        });
        */
        console.log(result);
    } catch(ex) {
        console.log(ex.message);
    }
}


// sometimes we might conditionally require some data
// like we need price to be required only when it is published

const courseSchemaPrice = new mongoose.Schema({
    name: {type: String, required: true},
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {type: Number, required: function() {
        return this.isPublished;
    }}
    // note: we cannot use the () => {} function here, because they don't have their own 'this' in context, instead they use the context of the enclosing code
});


// depending on the data type, we have additional built in validators
// for eg. for the String datatype we also have the minLength, maxLength and match validators
// for Number and Date we have min and max

const courseSchemaBuiltIn = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255,
        match: /.*a.*/
    },
    // we also have a validator called enum
    // this is useful when we have some predefined Strings
    category: {
        type: String,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {
            return this.isPublished;
        },
        min: 10,
        max: 500
    }
});


// custom validators

// the required validator is not enough when it caomes to arrays
// because passing an empty array is fine according to mongoose
// so we need a custom validator here

const courseSchemaCustom = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255,
        match: /.*a.*/
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array, 
        validate: {
            validator: function(v) {
                return v && v.length > 0;                   // this basically says that if tags has a value and the length of the value is > 0
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {
            return this.isPublished;
        },
        min: 10,
        max: 500
    }
});


// async validators
// required when we want to validate data that is not readily available

// set the isAsync property to true
// pass a callback for when the async work is done

const courseSchemaCustom = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255,
        match: /.*a.*/
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array, 
        validate: {
            isAsync: true,          
            validator: function(v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {
            return this.isPublished;
        },
        min: 10,
        max: 500
    }
});



// handling errors

async function createCourse() {                                                
    const nodeCourse = new Course({
        name: 'Python Course',
        author: 'Aditya',
        tags: ['python', 'scripting'],
        isPublished: true
    });

    try {
        const result = await nodeCourse.save();
        console.log(result);
    } catch(ex) {
        // sometimes there may be more than one errors
        // so instead of just printing the message
        // we can iterate over all the properties of the error object and get more information
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
}


// more properties for schema

// for strings we have
// lowercase
// uppercase

// we can also define a custom getter and a custom setter
const courseSchemaCustom = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255,
        match: /.*a.*/
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'network'],
        lowercase: true
    },
    author: String,
    tags: {
        type: Array, 
        validate: {
            isAsync: true,          
            validator: function(v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
            },
            message: 'A course should have at least one tag.'
        },
        uppercase: true
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {
            return this.isPublished;
        },
        min: 10,
        max: 500,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});