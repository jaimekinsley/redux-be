const { Router } = require('express');
const Contact = require('../models/Contact');

module.exports = Router()

  .post('/', (req, res, next) => {
    Contact
      .create(req.body)
      .then(contact => res.send(contact))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Contact.count({})
      .then((count) => {
        return Promise.all(
          Contact
            .find()
            .limit(5)
            .skip((req.query.page - 1) * 5)
            .then(contacts => res.send({ contacts, count }))
            .catch(next)
        );}
      );
  })

//   .get('/', (req, res, next) => {
//   Contact
//     .find()
//     .limit(5)
//     .skip((req.query.page - 1) * 5)
//     .then(contacts => res.send(contacts))
//     .catch(next);
// })

  .get('/:id', (req, res, next) => {
    Contact
      .findById(req.params.id)
      .then(contact => res.send(contact))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Contact
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(contact => res.send(contact))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Contact
      .findByIdAndDelete(req.params.id)
      .then(contact => res.send(contact))
      .catch(next);
  });
