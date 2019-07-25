const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;


//Signing up route
router.get("/signup", function(req, res, next) {
    res.render("signup");
});

// Create a new user
router.post("/signup", (req,res)=> {
  let newUser = {
      username: req.body.username,
      password: req.body.password,
  
  };


  User.create(newUser)
    .then(()=> {
      res.redirect("/user/login")
    })

    .catch(()=> {
      res.send("error");
    })
})

// Getting login form
router.get('/login', function(req, res, next) {
  res.render('login');
});

// Login the new user
router.post("/login", function(req, res, next) {
  User.findOne({username: req.body.username})
    .then((user)=> {
      if(user) {
        if(user.password === req.body.password) {
          // log the user in
          req.session.user = user; // start a session for user
          res.redirect("/user/profile");
        } else {
          res.send("Invalid credentials");
        }
      } else {
        res.send("Invalid credentials");
      }
    })
    .catch((error)=> {
      res.send("error")
    })
});

//Profile-page
router.get("/profile", function(req, res, next) {
  if (req.session.user) {
      res.render("profile");
  } else {
    res.render("login");
  }
});


// Logout
router.get("/logout", (req,res)=> {
  req.session.destroy();
  res.redirect("/user/login");
})

module.exports = router;