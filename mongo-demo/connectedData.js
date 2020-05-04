// Properties of a collection may be complex such that
// a property can be another document that has multiple properties

// for eg. if there is another collection named author that has info about author
// and our courses collection has a property author
// then we need to get the connect these collections

// there are two approaches
// 1. Using references, a.k.a. Normalization
// 2. Using Embedded documents a.k.a. DeNormalization

// In approach 1,
// We can have seperate documents for properties of a document

let author = {                          // id: id1
    name: 'Author',
    age: 65
}

// and we will reference this object in another collection using its id

let courses = {
    title: 'xyz',
    author: 'id1'
}

// it might look like that by using references,
// there is a relationship between the two documents,
// which in turn focuses on consistency
// but in nosql databases, there isn't any such relationship


// the other approach is to embedd a document inside anothre document

let embeddedCourse = {
    title: 'abc',
    author: {
        name: 'Author',
        age: 34
    }
}

// both approaches have their pros and cons and they all really depend on the requirements of our application

// we have to decide between the trade-off between query performance and consistency

// approach 1 focuses on consistency
// if we make a change in the author document,
// those changes are reflected in all places referencing it
// but this requires an extra query
// which may in trun affect performance

// approach 2 focuses on performance
// as it requires only one query
// but when want to make changes, we have to apply those changes in multiple places
// and if that is not done successfully, we might end up with inconsistent data



// a third approach is possible
// which is a combination of the above two approaches
// a hybrid approach


let author = {                          // id: id1
    name: 'Author',
    age: 65
    // more properties
}

let courses = {
    title: 'xyz',
    author: {
        id: 'id1',
        name: 'abc'
    }
}

// this approach is particularly useful when we want to have a snapshot of the data at any point in time