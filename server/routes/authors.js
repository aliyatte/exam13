const express = require('express');

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const Author = require('../models/Author');

const router = express.Router();

router.get('/', async (req, res) => {
  const authors = await Author.aggregate([{
    $lookup: {
      from: 'books',
      localField: '_id',
      foreignField: 'author',
      as: 'books'
    }
  }, {
    $project: {
      "name": 1,
      "booksCount": {"$size": "$books"}
    }
  }]);

  return res.send(authors);
});

router.post('/', [auth, permit('admin')], async (req, res) => {
  const author = new Author({
    name: req.body.name,
    biography: req.body.biography,
  });

  await author.save();

  return res.send(author);
});

module.exports = router;