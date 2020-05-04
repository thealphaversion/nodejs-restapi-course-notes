// automated testing is writing code to  test our code

// with automated testing, our source code consists of
// production code or application code
// test code

// in manual testing the time required to test the application increases with complexity and size
// so we use automated testing

// with automated testing,  we write code and directly call a function to be tested with different inputs
// and verify that this function returns the right output
// we can rerun this test everytime we change our code, and before deploying
// we can test all execution paths very fast

// benefits
// we can test our code frequently, in less time
// catch bugs before deployment, to reduce the number of bugs that go into production
// makes testing after refactoring easy


// types of tests
// unit tests
// integration tests
// end to end tests

// unit test
// a unit test tests a unit of an application without its external dependencies
// we can verify that each building block of the application is working as expected

// integration test
// a unit test tests a unit of an application with its external dependencies

// end-to-end tests
// drives an application through its ui
// this gives great confidence about the health of the application
// but are very slow and it is done through the ui
// they are very brittle, small changes can break these tests


// some frameworks for testing are:
// jasmine
// mocha    (with chai and sinon plugins)
// jest     (basically a wrapper around jasmine)        (facebook uses this)

// tools and frameworks come and go,
// but the fundamentals are the same and most important







// we want jest to automatically rerun tests
// so in package.json
// "scripts": {
//    "test": "jest --watchAll"                         // we add this watchAll flag
//}