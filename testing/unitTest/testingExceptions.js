// testing exception


describe('registerUser', () => {
    test('should throw if username is falsy', () => {
        // falsy as in:
        // null
        // undefined
        // NaN
        // ''
        // 0
        // false

        // testing exceptions is a little bit different
        // we pass a callback function, because we would not be getting anything returned back to us
        
        // expect(() => { lib.registerUser(null) }).toThrow();

        // here our test is only one line long
        // so we can repeat the same for all of the cases mentioned above
        // but this may not be the case always
        // so we must use parameterised tests then

        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(arg => {
            expect(() => { lib.registerUser(arg) }).toThrow();
        });
    });

    test('should return a username object if valid username is passed', () => {
        const result = lib.registerUser('aditya');
        expect(result).toMatchObject({ username: 'aditya' });
        expect(result.id).toBeGreaterThan(0);
    });
});