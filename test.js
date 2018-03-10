const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex   = require("knex")(knexConfig[ENV]);

  knex('follows')
      .insert({user_id : process.argv[2],
                category_id : process.argv[3]
                })
      .then((results) => {
        console.log(results);
      });



//**************


"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");


//****FUNCTIONS****//

function userAuthentication(email, password) {
  const usersQuery =  knex.select("*").from("users").where({email, password})
                          .limit(1);
  const userPromise = usersQuery
                          .then(users => users[0]);
    return userPromise;
}


module.exports = (knex) => {


router.get("/", (req, res) => {
  //knex.select('id', 'first_name')
  //    .from('users')
  //    .where('id', req.session.user)
  //    .then((result) => {
  //      res.json(result)
  //    });
//});

 if (cookieSession.user_id) {
      alert('You are already logged in!');
    } else {
    let user = request.session.user;
      response.render('login', {user});
    }
});


//LOGIN
router.post("/login", (req, res) => {
  const userPromise = userAuthentication(req.body.email, req.body.password)


//LOGOUT
router.post("/logout", (req, res) => {
  req.session.destroy();
  console.log("Logout successful.");
  res.redirect("/");
});


//GET TO REGISTRATION PAGE
router.get("/register", (req, res) => {
  res.render("register");
});

//REGISTER NEW USER
router.post("/register", (req, res) => {
  if(!req.body.first_name || req.body.last_name) {
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
  let password = bcrypt.hashSync(req.body.password);
  let newUser = {
    first_name: firstname,
    last_name: lastname,
    username: username,
    email: email,
    password: password

  };

  knex('users')
     .insert(newUser)
     .returning(['id', 'first_name'])
     .then((result) => {
      req.session.user = result[0].id;
      res.status(200).redirect('/articles')
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

