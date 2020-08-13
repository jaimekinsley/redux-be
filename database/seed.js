const chance = require('chance').Chance();
const Contact = require('../lib/models/Contact');
const Communication = require('../lib/models/Communication');
const User = require('../lib/models/User');

module.exports = async({ users = 10, contacts = 10, communications = 25 } = {}) => {

  const communicationTypes = ['LinkedIn', 'email', 'phone', 'slack'];

  const createdUsers = await User.create([...Array(users)].map((_, i) => ({
    email: `test${i}@email.com`,
    password: 'password',
    profileImage: 'https://fillmurray.com/200/300'
  })));

  const createdContacts = await Contact.create([...Array(contacts)].map(() => ({
    user: chance.pickone(createdUsers)._id,
    name: chance.name(),
    communicationMedium: chance.pickone(communicationTypes),
    imageUrl: 'https://placekeanu.com/200/300'
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
