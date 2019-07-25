const express = require('express');
const router  = express.Router();
const Recipe = require('../models/Recipe');



/* Render all Recipes on homepage */
router.get('/', (req, res, next) => {
  Recipe.find({})
  .then((recipe)=> {
    res.render('all-recipes', {recipe});
  })

    .catch((error)=> {
        next()
    })
});


// Register new recipe
router.get('/new', (req, res, next) => {
  Recipe.find({})
  .then((recipe)=> {
    res.render('new', {recipe});
  })
});

// Send new Recipe
router.post("/new", (req,res)=> {
  let newRecipe = {
      title: req.body.title,
      cuisine: req.body.cuisine,
      level: req.body.level,
      ingredients: req.body.ingredients,
      dishType: req.body.dishType,
      image: req.body.image,
      ingredients: req.body.ingredients,
      duration: req.body.duration,
      creator: req.body.creator
  };

  Recipe.create(newRecipe)
      .then((recipe)=> {
          res.redirect("/")
      })
      .catch((error)=> {
        console.log("Fill out all the required fields");
      })
})

// Edit Route
router.get("/edit/:id", function(req, res, next) {
  Recipe.findById(req.params.id)
      .then((recipe)=> {
          res.render("edit", {recipe});
      })
      
      .catch((error)=> {
          next()
      })
});

// Posting Edit Route
router.post("/edit/:id", function (req, res, next) {
    let updateRecipe = {
      title: req.body.title,
      cuisine: req.body.cuisine,
      level: req.body.level,
      ingredients: req.body.ingredients,
      dishType: req.body.dishType,
      image: req.body.image,
      ingredients: req.body.ingredients,
      duration: req.body.duration,
      creator: req.body.creator
  };


Recipe.findByIdAndUpdate(req.params.id, updateRecipe)

      .then((recipe)=> {
        res.redirect(`/edit/${recipe.id}`)
      })

      .catch((error)=> {
        next()
      })

});


// Delete Recipe
router.get("/edit/delete/:id", function (req, res, next) {
  Recipe.findByIdAndDelete(req.params.id)
    .then(()=>{
      res.redirect("/")
    })

});

module.exports = router;

