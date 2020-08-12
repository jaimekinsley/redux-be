const request = require('supertest');
const app = require('../lib/app');
const Contact = require('../lib/models/Contact');
const { prepare } = require('../database/data-helpers');

describe('Contact test', () => {
  it('creates a contact with POST', async() => {
    return await request(app)
      .post('/api/v1/contacts')
      .send({
        name: 'Jaime Sanders',
        communicationMedium: 'email',
        imageUrl: 'http://photos.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'Jaime Sanders',
          communicationMedium: ['email'],
          imageUrl: 'http://photos.com'
        });
      });
  });

  it('retrieves all contacts with GET', async() => {
    const contacts = prepare(await Contact.find());

    return await request(app)
      .get('/api/v1/contacts')
      .then(res => {
        expect(res.body).toEqual(contacts);
      });
  });

  it('retrieves a contact by id with GET', async() => {
    const contact = prepare(await Contact.findOne());

    return await request(app)
      .get(`/api/v1/contacts/${contact._id}`)
      .then(res => {
        expect(res.body).toEqual(contact);
      });
  });

  it('can update a contact by id with PATCH', async() => {
    const contact = prepare(await Contact.findOne());

    return await request(app)
      .patch(`/api/v1/contacts/${contact._id}`)
      .send({ name: 'New Name' })
      .then(res => {
        expect(res.body).toEqual({
          ...contact,
          name: 'New Name'
        });
      });
  });

  it('deletes a contact by id with DELETE', async() => {
    const contact = prepare(await Contact.findOne());

    return await request(app)
      .delete(`/api/v1/contacts/${contact._id}`)
      .then(res => {
        expect(res.body).toEqual(contact);
      });
  });
});
