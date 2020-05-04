// sometimes functions may return a array

// tests should not be too specific or general

describe('getCurrencies', () => {
    test('should return supported currencies', () => {
        const result = lib.getCurrencies("Aditya");
        expect(result).not.toBeNull();
        expect(result).toBeDefined();       // these are too general. It doesn't give us any values.
        // so if we change the function to return a number instead of the currencies, the test will pass

        // a too specific assertion would be
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('AUD');
        expect(result[2]).toBe('EUR');
        expect(result.length).toBe(3);

        // this test will break if we change the sorting algorithm or add another element

        // proper way
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');

        // this test tells us about the supported currencies

        // their is a cleaner way to test this tho
        
        // ideal way
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
        // as long as the result object has these values in any order, the test will pass
    });
});