const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');

describe('auth routes', () => {
  beforeAll(async() => {
    const uri = await mongod.getUri();
    return connect(uri);
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(async() => {
    await mongoose.connection.close();
    return mongod.stop();
  });

  it('signs up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
        profileImage: 'http://photo.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'test@test.com',
          profileImage: 'http://photo.com'
        });
      });
  });

  it('logs in a user', async() => {
    await User.create({
      email: 'test@test.com',
      password: 'password'
    });

    return request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'test@test.com',
        });
      });
  });
});
