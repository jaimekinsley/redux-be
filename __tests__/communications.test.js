const request = require('supertest');
const app = require('../lib/app');
const { prepare } = require('../database/data-helpers');
const Contact = require('../lib/models/Contact');
const Communication = require('../lib/models/Communication');

describe('Communication test', () => {
  it('creates a communication with POST', async() => {
    const contact = prepare(await Contact.findOne());

    return await request(app)
      .post('/api/v1/communications')
      .send({
        contact: contact._id,
        contacted: [{
          date: 'August 15, 2020',
          method: 'LinkedIn',
          notes: 'sent a message asking for informational interview',
          nextSteps: 'wait for response'
        }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          contact: contact._id,
          contacted: [{
            _id: expect.anything(),
            date: '2020-08-15T07:00:00.000Z',
            method: 'LinkedIn',
            notes: 'sent a message asking for informational interview',
            nextSteps: 'wait for response'
          }]
        });
      });
  });

  it('finds all communications with GET', async() => {
    const communications = prepare(await Communication.find());

    return await request(app)
      .get('/api/v1/communications')
      .then(res => {
        expect(res.body).toEqual(communications);
      });
  });

  it('retrieves a communication by id with GET', async() => {
    const communication = prepare(await Communication.findOne());

    return await request(app)
      .get(`/api/v1/communications/${communication._id}`)
      .then(res => {
        expect(res.body).toEqual(communication);
      });
  });

  it('updates a communication with PATCH', async() => {
    const communication = prepare(await Communication.findOne());

    return await request(app)
      .patch(`/api/v1/communications/${communication._id}`)
      .send({ contacted: { date: 'August 20, 2020', method: 'email', notes: 'sent intro email' } })
      .then(res => {
        expect(res.body).toEqual({
          ...communication,
          contacted: [{ _id: expect.anything(), date: '2020-08-20T07:00:00.000Z', method: 'email', notes: 'sent intro email' }]
        });
      });
  });

  it('deletes a communication with DELETE', async() => {
    const communication = prepare(await Communication.findOne());

    return await request(app)
      .delete(`/api/v1/communications/${communication._id}`)
      .then(res => {
        expect(res.body).toEqual(communication);
      });
  });
});
