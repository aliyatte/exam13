const express = require('express');
const ValidationError = require('mongoose').Error.ValidationError;

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const upload = require('../multer').uploads;

const Book = require('../models/Book');

const router = express.Router();

router.get('/', async (req, res) => {
  let dbQuery = {};

  if (req.query.category) {
    dbQuery.category = req.query.category;
  }

  const books = await Book.find(dbQuery).populate('category');
  res.send(books);
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).send({message: 'Not found'});
    }

    res.send(book);
  } catch (e) {
    res.status(404).send({message: 'Not found'});
  }
});

router.post('/', [auth, permit('admin'), upload.single('image')], async (req, res) => {
  try {
    const bookData = {
      title: req.body.title,
      author: req.body.author,
      cover: req.file.filename,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
    };

    const book = new Book(bookData);

    await book.save();

    return res.send({id: book._id});
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send(e);
    } else {
      return res.sendStatus(500);
    }
  }
});

router.delete("/:id", [auth, permit('admin')], async (req, res) => {
  try {
    await Book.findOneAndRemove({_id: req.params.id});
    return res.send({message: `${req.params.id} removed`});
  } catch (error) {
    return res.status(422).send(error);
  }
});

module.exports = router;