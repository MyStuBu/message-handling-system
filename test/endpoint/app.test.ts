import supertest from 'supertest';
import StudyBuddyServer from '../../src/App';

const studyBuddyServer = new StudyBuddyServer();
const request = supertest(studyBuddyServer.app);

beforeAll(async () => {
    // Start the server before running tests
    await studyBuddyServer.start();
});

describe('GET /', () => {
    it('should return a "Hello World!" message', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
});