const { Router } = require('express');
const Communication = require('../models/Communication');

module.exports = Router()

  .post('/', (req, res, next) => {
    Communication
      .create(req.body)
      .then(communication => res.send(communication))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Communication
      .find()
      .then(communications => res.send(communications))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Communication
      .findById(req.params.id)
      .then(communication => res.send(communication))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Communication
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(communication => res.send(communication))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Communication
      .findByIdAndDelete(req.params.id)
      .then(communication => res.send(communication))
      .catch(next);
  });

