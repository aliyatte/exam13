const express = require('express');
const ValidationError = require('mongoose').Error.ValidationError;

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const upload = require('../multer').uploads;

const Book = require('../models/Book');

const router = express.Router();

router.get('/', async (req, res) => {
  let books;

  if (req.query.category) {
    books = await Book.find({category: req.query.category});
  } else if (req.query.author) {
    books = await Book.find({author: req.query.author});
  } else {
    books = await Book.find();
  }

  res.send(books);
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.find({_id: req.params.id}).populate('author', 'name');

    if (!book) {
      return res.status(404).send({message: 'Not found'});
    }

    res.send(book[0]);
  } catch (e) {
    res.status(404).send({message: 'Not found'});
  }
});

router.post('/', [auth, permit('admin'), upload.single('image')], async (req, res) => {
  try {
    const bookData = {
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
    };

    if (req.file) {
      bookData.image = req.file.filename;
    }

    const book = new Book(bookData);

    await book.save();

    return res.send({id: book._id});
  } catch (e) {
    return res.status(400).send({message: 'Not found'});
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