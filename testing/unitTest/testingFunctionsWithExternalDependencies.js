// testing functions with external dependencies like database connections etc.

// here we want to de-couple the function to be tested from external sources

// so we need to  replace the real implementation of the external call,
// with a fake or mock implementatiion

const db = require('./db');

describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {
        db.getCustomerSync = function(customerId) {
            return { email: 'test email' };
        }
        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);

        // but we need to replace the orignal function with a mock function
        // which we have done above with db.getCustomerSync
    });
});

// when we require() a module in our node application, it is cached,
// so if we have a require() to a module in many places, all of them have the same module loaded



const mail = require('../mail');

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


// while this is a perfectly fine way of creating monk functions,
// there is a simpler way

// in jest there is a way for making mock functions

const mockFunction = jest.fn();
// now this mock function has no implementation
// we can set the value that we want this function to return

mockFunction.mockReturnValue(1);
const result = mockFunction();          // here result would be one


// we can also program the mock function to return a promise
const mockFunction = jest.fn();
mockFunction.mockResolveValue(1);
const result = await mockFunction();


// if we want to simulate an error,
// we would call mockRejectedValue

const mockFunction = jest.fn();
mockFunction.mockRejectedValue(new Error('message'));
const result = await mockFunction();


// so instead of manually writing mock functions, we can use jest to write mock functions

describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
        db.getCustomerSync = jest.fn().mockREturnValue({ email: 'test email' });
        mail.send = jest.fn();
        
        lib.notifyCustomer({ customerId: 1 });

        expect(mailSent).toHaveBeenCalled();            // we only have this matcher available here because mail.send is now a jest mock function
        // manually we wouldn't have this matcher

        // we have anpther matcher called toHaveBeenCalledWith
        // expect(mail.sent).toHaveBeenCalledWith('test email', '...');         // this works best with parameters that are not strings

        expect(mail.send.mock.calls[0][0]).toBe('test email');
        expect(mail.send.mock.calls[0][1]).toMatch(/.../);
    });
});