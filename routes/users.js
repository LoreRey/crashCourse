"use strict";

const express = require('express');
const router  = express.Router();
//const bcrypt = require('bcrypt');
const bcrypt  = require('../bcrypt_stub.js')
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");


module.exports = (knex) => {

  //GET USER
  router.get("/", (req, res) => {
    knex.select('user_id', 'first_name')
        .from('users')
        // .where('id', req.session.user)
        .then((result) => {
          res.json(result)
        });
  });


//LOGIN
router.get("/login", (req, res) => {
 res.render("login")
});

  //LOGIN
  router.post("/login", (req, res) => {

   console.log(req.body)
   if(!req.body.email || !req.body.password) {
     res.status(403).send('Must enter a valid username and password')
   }

   knex('users')
       .select('user_id', 'first_name', 'password')
       .where('email', req.body.email)
       .then(function(result) {

          if(!result || !result[0]) {
             res.status(404).send('User not found.')
          } else if(req.body.password === result[0].password) {
             req.session.user = result[0].user_id
             console.log(req.session)
             res.redirect("/main")
          } else {
             res.status(401).send('Not authorized')
           }
       });
 });


  // //LOGOUT
  // router.post("/logout", (req, res) => {
  //   req.session.destroy();
  //   console.log("Logout successful.");
  //   res.redirect("/");
  // });


  //GET TO REGISTRATION PAGE
  // router.get("/users/register", (req, res) => {
  //   res.render("register");
  // });

  //REGISTER NEW USER
  router.post("/register", (req, res) => {
    if(!req.body.first_name || !req.body.last_name) {
      res.status(400).send('You must provide first and last name.')
    }
    if(!req.body.username) {
      res.status(400).send('You must provide a username.')
    }
    if(!req.body.email || !req.body.password) {
      res.status(400).send('Required e-mail and password!')
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
       .then((result) => {
        req.session.user = result[0].user_id;
        req.session.name = result[0].first_name
        res.status(200).redirect('/main')
       });
  });



  //PROFILE PAGE
  router.get("/profile", (req, res) => {
    knex.select('first_name', 'last_name', 'email', 'username')
        .from('users')
        .where({id: req.session.user_id})
        .then((results) => {
          res.render("profile");
        });
  });



 return router;
};
