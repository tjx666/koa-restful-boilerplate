const mongoose = require('mongoose');
const supertest = require('supertest');
const logSymbols = require('log-symbols');

const { appLogger } = require('../src/helpers/logger').helpers;
const { userService } = require('../src/services');

const start = require('../src/index');
const config = require('../configs');

before(async function() {
    this.timeout(10 * 1000);

    // destroy old test db
    const { dbName, address, connectOptions } = config.db;
    const conn = await mongoose.createConnection(address, connectOptions);
    await conn.dropDatabase();
    appLogger.info(`Drop old database ${dbName} ${logSymbols.success}`);

    // startup server
    const { app, server } = await start();
    global.__test_app__ = app;

    // add some test data
    const testUsers = [
        {
            name: 'test',
            password: 'test',
            age: 16,
        },
        {
            name: 'ly1',
            password: 'hash(666666)',
            age: 21,
        },
        {
            name: 'ly2',
            password: 'hash(999999)',
            age: 18,
        },
    ];
    await Promise.all(testUsers.map(user => userService.createUser(user)));

    // get jwt
    const resp = await supertest(server)
        .post('/api/v1/users/login')
        .send({ name: 'test', password: 'test' })
        .expect(200);
    const token = resp.body.data;

    // setup global request util
    global.request = supertest.agent(server).set('Authorization', token);
});

after(async () => {
    await global.__test_app__.db.close();
});
