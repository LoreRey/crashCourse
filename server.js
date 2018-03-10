"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const cookieSession = require("cookie-session");
const bcrypt = require('bcrypt');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const articlesRoutes = require("./routes/articles");
const likeRoutes = require("./routes/likes");
const commentRoutes = require("./routes/comments");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use(cookieSession({
  name: "user_id",
  secret: "fdafasfdas"
}));

// Mount all resource routes
app.use("/users", usersRoutes(knex));
app.use("/articles", articlesRoutes(knex));
app.use("/likes", likeRoutes(knex));
app.use("/comments", commentRoutes(knex));

// Home page
app.get("/register", (req, res) => {
  res.render("Register");
});

app.get("/articles/:article_id",(req,res) =>{
    let article_id = req.params.article_id
    let templateVar ={}

     knex('articles')
     .where({article_id :article_id})
     .select('*')
     .then ((result) => {
         //console.log(result);
      templateVar.article = result[0];
     let title = templateVar.title;
     console.log(title);
   console.log('blah', templateVar);

 res.render("article", templateVar)
     })
})

app.get("/main", (req, res) => {
  let templateVars = {};
  if (req.session.user) {
    knex.select('user_id', 'first_name')
        .from('users')
        .where('user_id', req.session.user)
        .then((result) => {
          templateVars.user = result[0];
          console.log(templateVars);
          res.render("Main", templateVars);
    });

    }
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
