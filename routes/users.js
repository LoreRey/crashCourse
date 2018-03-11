"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
//const bcrypt  = require('../bcrypt_stub.js')
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");


module.exports = (knex) => {


  // Registration Page
  router.get("/register", (req, res) => {
    res.render("Register");
  });

// //GET USER
// router.get("/", (req, res) => {
//   knex.select('user_id', 'first_name')
//       .from('users')
//       // .where('id', req.session.user)
//       .then((result) => {
//         res.json(result)
//       });
// });


  //LOGIN
  router.get("/login", (req, res) => {
    if (req.session.user) {
      res.redirect("/articles");
    } else {
      res.render("login");
    }
  });

  //LOGOUT
  router.get("/logout", (req, res) => {
    req.session = null;
    // console.log("Logout successful.");
    res.redirect("login");
  });

  // //PROFILE PAGE
  router.get("/profile", (req, res) => {
    if (req.session.user) {
      let templateVars = {};
      knex.select('*')
          .from('users')
          .where('user_id', req.session.user)
          .then((result) => {
            templateVars.user = result[0];
            // console.log(templateVars);
            knex.select('*')
                  .from('articles')
                  .where('contributor', req.session.user)
                  // .innerJoin("categories", "category", "category_id")
                  .orderBy("created_at", "desc")
                  .then((results) => {
                    // console.log(results)
                    templateVars.articles = [];
                    for (let article of results) {
                      // console.log(article)
                      templateVars.articles.push(article);
                    }
                    // console.log(templateVars)
                    res.render("profile", templateVars);
                  });
      });

    } else {
      res.redirect("/login");
    }
  });

  //LOGIN
  router.post("/login", (req, res) => {

   // console.log(req.body)
   if(!req.body.email || !req.body.password) {
     res.status(403).render("login", {error: 'Must enter a valid username and password'});
   }

   knex('users')
      .select('user_id', 'first_name', 'password')
      .where('email', req.body.email)
      .then(function(result) {
          if(!result || !result[0]) {
             res.status(404).render("login", {error: 'User not found.'});
          } else if(req.body.password === result[0].password) {
             req.session.user = result[0].user_id
             // console.log(req.session)
             res.redirect("/articles")
          } else {
             res.status(401).send('Not authorized')
           }
       });
  });


  //REGISTER NEW USER
  router.post("/register", (req, res) => {
    if (!req.body.first_name || !req.body.last_name || !req.body.username || !req.body.email || !req.body.password) {
      res.status(400).render("register", {error: "Please ensure that all fields are filled out"});
    }


    let firstname = req.body.first_name;
    let lastname = req.body.last_name;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let newUser = {
      first_name: firstname,
      last_name: lastname,
      username: username,
      email: email,
      password: password

    };

    knex('users')
       .insert(newUser)
       .returning(['user_id', 'first_name'])
       .catch((error) => {
          res.status(409).render("register", {error: "That username already exists"});
       })
       .then((result) => {
        req.session.user = result[0].user_id;
        req.session.name = result[0].first_name
        res.status(200).redirect('/articles')
       });
  });




 return router;
};
