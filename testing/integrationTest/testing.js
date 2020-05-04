let server = require('../../index');

describe('/api/genres', () => {
    describe('GET /', () => {
        // tests
    });
});

// everytime we run our tests, jest will load the server again
// so when we run the test the second time
// we will get an error because there is already a server running on port 3000

// so we must close the server each time

// in jasmine and jest, we have a utility function called beforeEach()
// and similarly we have another utility function called afterEach()

const request = require('supertest')
let server;

describe('/api/genres', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(() => { server.close(); });
    
    describe('GET /', () => {
        it('should return all genres', async () => {
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
        });
    });
});

// this will not tell us if the data returned is correct

// so we need to prepopulate the test database to check if the returned data is correct

describe('/api/genres', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(async () => {
        server.close();
        // whenever we make changes to a db, we should always cleanup afterwards
        await Genre.remove({});           // this will remove all genres
    });
    
    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                { title: 'genre1' },
                { title: 'genre2' }
            ]);
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.title === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.title === 'genre2')).toBeTruthy();
        });
    });
});

// always execute a test as if it is the only test ever
// so that it always runs in a clean state

