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


// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const articlesRoutes = require("./routes/articles");
const likeRoutes = require("./routes/likes");
const commentRoutes = require("./routes/comments");
const categoryRoutes = require("./routes/catg_follows");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
// app.use(bodyParser.json());
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
app.use("/categories", categoryRoutes(knex));

// Home page
app.get("/register", (req, res) => {
  res.render("Register");
});

app.get("/image",(req,res)=>{
  res.render("Image");
})
app.get("/articles/:article_id",(req,res) =>{
    let article_id = req.params.article_id;
    let templateVars ={};

     knex('articles')
     // .innerJoin("comments", "articles.article_id", "comments.article")
     .where({article_id :article_id})
     .select('*')
     .then ((result) => {
         //console.log(result);
        templateVars.article = result[0];
        knex("comments")
          .select("*")
          .where("article", templateVars.article.article_id)
          .then((result) => {
            templateVars.comments = [];
            for (let comment of result) {
              templateVars.comments.push();
              console.log(templateVars);

        res.render("article", templateVars);
            }
          });
        // let title = templateVars.title;
        // console.log(title);
        // console.log('blah', templateVars);
     });
});
app.get("/", (req, res) => {
  res.render("main")
})


app.get("/main", (req, res) => {
  let templateVars = {};
  if (req.session.user) {
    knex.select('user_id', 'first_name')
        .from('users')
        .where('user_id', req.session.user)
        .then((result) => {
          templateVars.user = result[0];
          // console.log(templateVars);
          knex.select('*')
                .from('articles')
                // .where('category', req.params.category)
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
                  res.render("Main", templateVars);
                });
    });

  } else {
    res.redirect("/login")
  }
});

//LOGIN
app.get("/login", (req, res) => {
 res.render("login")
});

  //LOGIN
app.post("/login", (req, res) => {

  console.log(req.body)
  if(!req.body.email || !req.body.password) {
    res.status(403).send('Must enter a valid username and password')
  }

  // console.log("hi)")
  knex('users')
    .select('email', 'user_id', 'first_name', 'password')
    .where('email', req.body.email)
    .then(function(result) {
          // console.log("hi2")

      if(!result || !result[0]) {
        res.status(404).send('User not found.')
      } else if(req.body.password === result[0].password) {
        req.session.user = result[0].user_id
        // console.log(req.session)
        res.redirect("/main")
      } else {
        res.status(401).send('Not authorized')
      }
 });
});

//LOGOUT
app.get("/logout", (req, res) => {
  req.session = null;
  console.log("Logout successful.");
  res.redirect("login");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
