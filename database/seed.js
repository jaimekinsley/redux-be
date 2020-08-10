const chance = require('chance').Chance();
const Contact = require('../lib/models/Contact');
const Communication = require('../lib/models/Communication');

module.exports = async({ contacts = 10, communications = 25 } = {}) => {

  const communicationTypes = ['LinkedIn', 'email', 'phone', 'slack'];

  const createdContacts = await Contact.create([...Array(contacts)].map(() => ({
    name: chance.name(),
    communicationMedium: chance.pickone(communicationTypes),
    imageUrl: chance.url()
  })));

  await Communication.create([...Array(communications)].map(() => ({
    contact: chance.pickone(createdContacts)._id,
    contacted: {
      date: chance.date(),
      method: chance.pickone(communicationTypes),
      notes: chance.sentence(),
      nextSteps: chance.sentence()
    }
  })));
};
