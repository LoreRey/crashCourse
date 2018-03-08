"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (knex) => {

//GET USER
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .where(...)
      .then((results) => {
        res.json(results);
    });
  });


//LOGIN
router.post("/login", (req, res) => {
  let reqEmail = req.body.email
  let reqPass = req.body.password

  if(!reqEmail || !passwordReq) {
    res.status(403).send('Must enter a valid username and password')
  }

  knex('users')
  .select(...)
  .where(...)
  ...

  //****TO IMPLEMENT****//
  //CHECK IF USER EXISTS
  //COMPARE PASSWORDS

});


//LOGOUT
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});


//GET TO REGISTRATION PAGE
router.get("/register", (req, res) => {
  res.render("register");
});


//REGISTER NEW USER
router.post("/register", (req, res) => {
  if(!req.body.first_name || req.body.last_name) {
    res.status(400).send('You must provide first and last name.')}
  if(!req.body.username) {
    res.status(400).send('You must provide a username.')}
  if(!req.body.email || !req.body.password) {
    res.status(400).send('Required e-mail and password!')}

  let firstname = req.body.first_name;
  let lastname = req.body.last_name;
  let username = req.body.username;
  let email = req.body.email;
  let password = bcrypt.hashSync(req.body.password);
  let newUser = {
    first_name: firstname,
    last_name: lastname,
    username: username,
    email: email,
    password: password
  }

  knex('users')
  .insert(newUser)
  ...

//PROFILE PAGE
router.get("/profile"), (req, res) => {
  res.render("profile");
}

  }



 return router;
}
