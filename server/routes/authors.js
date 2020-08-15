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
      "title": 1,
      "bookCount": {"$size": "$books"}
    }
  }]);

  return res.send(authors);
});

router.get('/:id', async (req, res) => {
  const author = await Author.aggregate([{
    $match: {
      _id: mongoose.Types.ObjectId(req.params.id),
    }
  }, {
    $lookup: {
      from: 'books',
      localField: '_id',
      foreignField: 'author',
      as: 'books'
    }
  }]);

  return res.send(author);
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