const { Router } = require('express');
const Contact = require('../models/Contact');
const { findById } = require('../models/Contact');

module.exports = Router()

  .post('/', (req, res, next) => {
    Contact
      .create(req.body)
      .then(contact => res.send(contact))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Contact
      .find().select({ name: true })
      .then(contacts => res.send(contacts))
      .catch(next);
  })

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
