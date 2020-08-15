const express = require('express');

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const Category = require('../models/Category');

const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await Category.aggregate([{
    $lookup: {
      from: 'books',
      localField: '_id',
      foreignField: 'category',
      as: 'books'
    }
  }, {
    $project: {
      "title": 1,
      "productCount": {"$size": "$books"}
    }
  }]);

  return res.send(categories);
});

router.get('/:id', async (req, res) => {
  const category = await Category.aggregate([{
    $match: {
      _id: mongoose.Types.ObjectId(req.params.id),
    }
  }, {
    $lookup: {
      from: 'books',
      localField: '_id',
      foreignField: 'category',
      as: 'books'
    }
  }]);

  return res.send(category);
});

router.post('/', [auth, permit('admin')], async (req, res) => {
  const category = new Category({
    title: req.body.title,
    description: req.body.description,
  });

  await category.save();

  return res.send(category);
});

module.exports = router;