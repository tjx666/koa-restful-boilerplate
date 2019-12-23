const assert = require('assert');

describe('#user API', () => {
    describe('#user register', () => {
        const registerURL = '/api/v1/users/register';

        it('#register user success', async () => {
            await request
                .post(registerURL)
                .send({ name: 'test-register', password: '9999999' })
                .expect(201, {
                    code: 0,
                    msg: 'ok',
                    data: {},
                });
        });

        it(`bad request should return { code: 400, msg: 'xxx' }`, async () => {
            await request
                .post(registerURL)
                .send({ age: 18 })
                .expect(400, {
                    code: 400,
                    msg: `"name" is required`,
                });
        });
    });

    describe('#test get users', async () => {
        it('#get all users success', async () => {
            const {
                body: { data: users },
            } = await request.get('/api/v1/users').expect(200);

            assert(users.length > 0);
        });
    });
});
