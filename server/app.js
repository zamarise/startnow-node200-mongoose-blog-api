const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

// console.log(process.env.MY);
mongoose.connect(
  process.env.ENV === 'production' ? process.env.MONGO_URI : 'mongodb://127.0.0.1:27017/my-blog',
  { useNewUrlParser: true }
);
mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).send();
});

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

module.exports = app;
