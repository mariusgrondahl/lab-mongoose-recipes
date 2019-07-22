const express = require('express');
const router  = express.Router();
const Recipe = require('../models/Recipe');


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kitchen', { useNewUrlParser: true })


/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index');
});

// All Recipies
router.get('/all-recipies', (req, res, next) => {
    res.render('recipies');
});



// Register new recipe
router.get('/new', (req, res, next) => {
  res.render('new');
});

// Editing recipe
router.get('/edit', (req, res, next) => {
  res.render('edit');
});

// Delete Recipe
router.get('/delete', (req, res, next) => {
  res.render('delete');
});


  // .then(() => {
  //   console.log('Connected to Mongo!');

  //   Recipe.create({
  //     title: "Brunos Americana",
  //     cuisine: "African",
  //   });

  // }).catch(err => {
  //   console.error('Error connecting to mongo', err);
  // });
module.exports = router;

