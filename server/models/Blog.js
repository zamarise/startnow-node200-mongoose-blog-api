// Imports mongoose and extracts Schema and ObjectId into it's own variables
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Creates a new Mongoose Schema
const BlogSchema = new Schema({
  title: { type: String, required: true },
  article: { type: String, required: true },
  published: { type: Date, required: true },
  featured: { type: Boolean, required: true },
  author: { type: ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Blog', BlogSchema);
