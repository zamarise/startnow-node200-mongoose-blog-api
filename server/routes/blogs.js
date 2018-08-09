const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

// Get all blogs
router.get('/', (req, res) => {
  Blog.find().then(blog => {
    res.status(200).json(blog);
  });
});

// Get all featured blogs
router.get('/featured', (req, res) => {
  Blog.where('featured', true).then(featured => {
    if (featured) {
      console.log('These are the featured blogs!');
      return res.status(200).json(featured);
    } else {
      console.log('Whoops! No featured blogs.');
      return res.status(404).json(featured);
    }
  });
});

// Get single blog
router.get('/:id', (req, res) => {
  Blog.findById(req.params.id).then(userId => {
    if (userId) {
      console.log('Found!');
      return res.status(200).json(userId);
    } else {
      console.log('Whoops!');
      return res.status(404).json(userId);
    }
  });
});

router.post('/', (req, res) => {
  // New higher scope variable
  let dbUser = null;
  // Fetch the user from the database
  User.findById(req.body.authorId)
    .then(user => {
      // Store the fetched user in higher scope variable
      dbUser = user;

      // Create a blog
      const newBlog = new Blog(req.body);

      // Bind the user to it
      newBlog.author = user._id;

      // Save it to the database
      return newBlog.save();
    })
    .then(blog => {
      // Push the saved blog to the array of blogs associated with the User
      dbUser.blogs.push(blog);

      // Save the user back to the database and respond to the original HTTP request with a copy of the newly created blog.
      dbUser.save().then(() => res.status(201).json(blog));
    });
});

// Update a blog
router.put('/:id', (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body).then(update => {
    if (update) {
      console.log('Updated!');
      return res.status(204).json(update);
    } else {
      console.log('Not updated!');
      return res.status(404).json(update);
    }
  });
});

// Delete a blog
router.delete('/:id', (req, res) => {
  Blog.findByIdAndRemove(req.params.id).then(remove => {
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
