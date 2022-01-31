const app = require('../app.js')
const request =  require('supertest')

// const authPath = '/api/auth';
describe('GET /api/users', () => {
    const usersPath = '/api/users';
    test('should response with 200 status code', async() => {
        const response = await request(app).get(usersPath).send()
        expect(response.statusCode).toBe(200)
    });

    test('should responde with and array', async() =>{
        const response = await request(app).get(usersPath).send()
        expect(response.body.users).toBeInstanceOf(Array)
    })
});