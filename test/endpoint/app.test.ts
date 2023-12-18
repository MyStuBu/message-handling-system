import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);

describe('GET /', () => {
    it('should return a "Hello World!" message', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: 'Hello from the Study Buddy backend.'});
    });
});

// describe('Fail', () => {
//     it('should fail', () => {
//       expect(false).toEqual(true)
//     })
// })