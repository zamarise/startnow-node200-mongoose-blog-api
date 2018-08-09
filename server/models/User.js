// Imports mongoose and extracts Schema and ObjectId into it's own variables
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Creates a new Mongoose Schema
const UserSchema = new Schema({
  // firstName property is a string and required
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },

  // New property
  social: {
    facebook: { type: String, required: false },
    twitter: { type: String, required: false },
    linkedIn: { type: String, required: false }
  },

  blogs: [{ type: ObjectId, ref: 'Blog' }]
});

module.exports = mongoose.model('User', UserSchema);
