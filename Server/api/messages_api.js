const express = require('express')

const router = express.Router();

const queries = require('../db/messages_queries')


function isValidID(req, res, next ) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid message'));
}

function validmessage(message) {
  const hasSubject = typeof message.subject == 'string' && message.subject.trim() != '';
  const hasBody = typeof message.body == 'string' && message.body.trim() != '';
  return hasSubject && hasBody;
}

router.get('/', (req, res) => {
  queries.getAll().then(message => {
    res.json(message)
  });
});

router.get('/:id', isValidID, (req, res, next) => {
    queries.getOne(req.params.id).then(message => {
      if(message) {
        res.json(message);
      }
      else {
        res.status(404);
        next();
      }
  });
});

router.post('/', (req, res, next) => {
  if(validmessage(req.body)) {
    queries.create(req.body).then(message => {
      res.json(message[0])
    })
  } else {
    next(new Error('Invalid message post'));
  }
})

router.put('/:id', isValidID, (req, res, next) => {
  if(validmessage(req.body)) {
    queries.update(req.params.id, req.body).then(messageDetails => {
      res.json(messageDetails[0])
    })
  } else {
    next(new Error('Invalid message put'));
  }
})

router.delete('/:id', isValidID, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      delete: true
    })
  })
})

module.exports = router;
