const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  User.find().then(users => {
    res.status(200).json(users);
  });
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id).then(userId => {
    if (userId) {
      console.log('Found!');
      return res.status(200).json(userId);
    } else {
      console.log('Whoops!');
      return res.status(500).json(userId);
    }
  });
});

router.post('/', (req, res) => {
  const newUser = new User({ firstName: 'Jon', lastName: 'Snow', email: 'jon@example.com' });
  newUser.save().then(save => {
    if (save) {
      console.log('Saved!');
      return res.status(200).json(save);
    } else {
      console.log('Not saved!');
      return res.status(500).json(save);
    }
  });
});

router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id).then(update => {
    if (update) {
      console.log('Updated!');
      return res.status(200).json(update);
    } else {
      console.log('Not updated!');
      return res.status(500).json(update);
    }
  });
});

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id).then(remove => {
    if (remove) {
      console.log('Successfully deleted!');
      return res.status(200).json(remove);
    } else {
      console.log('Not deleted!');
      return res.status(500).json(remove);
    }
  });
});

module.exports = router;
