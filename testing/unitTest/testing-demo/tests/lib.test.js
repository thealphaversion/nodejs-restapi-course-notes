const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute', () => {
    test('return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);         // toBe is a matcher function   // more are available on the docs page
    });
    
    it('should return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);         // toBe is a matcher function   // more are available on the docs page
    });
    
    it('should return zero if input is zero', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);         // toBe is a matcher function   // more are available on the docs page
    });
});
 
describe('greet', () => {
    test('return a greeting message', () => {
        const result = lib.greet("Aditya");
        expect(result).toContain("Aditya");
    });
});

describe('getCurrencies', () => {
    test('should return supported currencies', () => {
        const result = lib.getCurrencies();
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
    });
});

describe('getProduct', () => {
    test('should return product with the given id', () => {
        const result = lib.getProduct(1);
        // expect(result).toEqual({ id: 1, price: 10 });
        expect(result).toMatchObject({ id: 1, price: 10 });
        // expect(result).toHaveProperty('id', 1);
    });
});

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

describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {
        db.getCustomerSync = function(customerId) {
            console.log('Fake reading customer...');
            return { id: customerId, points: 20 };
        }
        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

/*
// This is commented to demonstrate the same mock functions using jest

describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
        db.getCustomerSync = function(customerId) {
            console.log('Fake reading customer...');
            return { id: customerId, points: 20 };
        }
        let mailSent = false;
        mail.send = function(email, message) {
            mailSent = true;
        }
        lib.notifyCustomer({ customerId: 1 });
        expect(mailSent).toBe(true);
    });
});

*/

describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
        db.getCustomerSync = jest.fn().mockREturnValue({ email: 'test email' });
        mail.send = jest.fn();
        
        lib.notifyCustomer({ customerId: 1 });

        expect(mailSent).toHaveBeenCalled();            // we only have this matcher available here because mail.send is now a jest mock function
        // manually we wouldn't have this matcher

        // we have anpther matcher called toHaveBeenCalledWith
        // expect(mail.sent).toHaveBeenCalledWith('test email', '...');         // this works best with parameters that are not strings
    });
});