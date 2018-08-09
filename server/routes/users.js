const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', (req, res) => {
  User.find().then(users => {
    res.status(200).json(users);
  });
});

// Get single user
router.get('/:id', (req, res) => {
  User.findById(req.params.id).then(userId => {
    if (userId) {
      console.log('Found!');
      return res.status(200).json(userId);
    } else {
      console.log('Whoops!');
      return res.status(404).json(userId);
    }
  });
});

// Create a user
router.post('/', (req, res) => {
  let newUser = new User(req.body);
  newUser.save().then(save => {
    if (save) {
      console.log('Saved!');
      return res.status(201).json(save);
    } else {
      console.log('Not saved!');
      return res.status(404).json(save);
    }
  });
});

// Update a user
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id).then(update => {
    if (update) {
      console.log('Updated!');
      return res.status(204).json(update);
    } else {
      console.log('Not updated!');
      return res.status(404).json(update);
    }
  });
});

// Delete a user
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id).then(remove => {
    if (remove) {
      console.log('Successfully deleted!');
      return res.status(200).json(remove);
    } else {
      console.log('Not deleted!');
      return res.status(404).json(remove);
    }
  });
});

module.exports = router;
