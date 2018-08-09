const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/', (req, res) => {
  Blog.find().then(blog => {
    res.status(200).json(blog);
  });
});

router.get('/:id', (req, res) => {
  Blog.findById(req.params.id).then(userId => {
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
  const newBlog = new Blog({
    title: 'New Blog post',
    article: 'Article',
    published: Date,
    featured: true,
    author: ObjectId
  });
  newBlog.save().then(save => {
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
  Blog.findByIdAndUpdate(req.params.id).then(update => {
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
  Blog.findByIdAndRemove(req.params.id).then(remove => {
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
