// similar to numbers we can test strings

describe('greet', () => {
    test('return a greeting message', () => {
        const result = lib.greet("Aditya");                 // this test is too specific
        expect(result).toBe("Welcome Aditya");
    });
    // even a small change im the code like appending an ! mark can break the test
    // tests so not be too specific as well as not too general
});

// instead of looking for equality, for strings, we can look for patterns
// we can use a regular expression

describe('greet', () => {
    test('return a greeting message', () => {
        const result = lib.greet("Aditya");
        expect(result).toMatch(/Aditya/);
    });
});


// if we don't want to use a regular expression,
// then we can use another matcher called toContain()

describe('greet', () => {
    test('return a greeting message', () => {
        const result = lib.greet("Aditya");
        expect(result).toContain("Welcome Aditya");
    });
});