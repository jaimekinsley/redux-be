const { Router } = require('express');
const Contact = require('../models/Contact');

const PAGE_SIZE = 5;

module.exports = Router()

  .post('/', (req, res, next) => {
    Contact
      .create(req.body)
      .then(contact => res.send(contact))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    return Promise.all([
      Contact
        .find()
        .count(),
      Contact
        .find()
        .limit(PAGE_SIZE)
        .skip((req.query.page - 1) * PAGE_SIZE)
    ])
      .then(([count, contacts]) => res.send({ contacts, totalPages: Math.ceil(count / PAGE_SIZE) }))
      .catch(next);
  }
  )

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
