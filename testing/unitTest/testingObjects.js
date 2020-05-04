// testing objects

describe('getProduct', () => {
    test('should return product with the given id', () => {
        const result = lib.getProduct(1);
        expect(result).toBe({ id: 1, price: 10 });
    });
});

// this test will fail even if the expected value returned is identical

// this is because the toBe() matcher matches the references of the two objects, which are in different locations
// so here, since result is in a different location than the object passed as argument, the matcher assumes both are different

// so instead we use toEqual()
describe('getProduct', () => {
    test('should return product with the given id', () => {
        const result = lib.getProduct(1);
        expect(result).toEqual({ id: 1, price: 10 });                   // to specific

        // we can also use
        expect(result).toMatchObject({ id: 1, price: 10 });

        // the difference between the two is
        // the first one looks for exactly the same object
        // the second one will pass as long as we have the provides keys in the object

        // there is also a third approach
        expect(result).toHaveProperty('id', 1);

        // this will only check if the property with the given value and type is present in the returned object
    });
});