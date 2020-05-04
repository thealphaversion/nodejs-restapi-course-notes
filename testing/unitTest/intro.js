// we would be using a sample project name 'testing-demo' to write unit tests for
// we'll be using Jest

// install Jest
// npm install jest --save-dev          

// we use the --save-dev flag because jest is development dependency
// when we deploy our application, we don't want to deploy jest to the production environment


// in package.json there is a propery called scripts
// here we can specify comands to run with npm
// one already available is test
// the default value is "echo \"Error: no test specified\" && exit 1"
// we are going to make a small change and set it to jest

// any file ending with spec.js or test.js is treated as a test by jest
// the naming convention is moduleToBeTested.test.js

// we call the test function that comes with jest
// we give the first argument as the name of our test
// the second argument is a function where we implement our test.
// when we run this test, jest will call this function

test('absolute - return a positive number if input is positive', () => {
    const result = lib.absolute(1);         // we could have used any +ve number here, but it is better to keep tests cases as simple as possible
    expect(result).toBe(1);
}); 

// there are more matcher functions like toBe() available,
// check jest documentation



// having lots of tests can make the test code unclean
// it is better practice to group tests

// we use the describe function to group them

test('absolute - return a positive number if input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);         // toBe is a matcher function   // more are available on the docs page
});

test('absolute - return a positive number if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);         // toBe is a matcher function   // more are available on the docs page
});

test('absolute - return zero if input is zero', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);         // toBe is a matcher function   // more are available on the docs page
});

// is changed to 

describe('absolute', () => {
    test('return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);         // toBe is a matcher function   // more are available on the docs page
    });
    
    test('return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);         // toBe is a matcher function   // more are available on the docs page
    });
    
    test('return zero if input is zero', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);         // toBe is a matcher function   // more are available on the docs page
    });
});

// we can also use the it function instead of test

it('should return a positive number if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);         // toBe is a matcher function   // more are available on the docs page
});

// this makes it easier to read

