"use strict";

const express = require('express');
const router  = express.Router();

const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");

module.exports = (knex) => {

  router.get("/", (req, res) => {
    let templateVars = {};
    if (req.session.user) {
     knex.select('user_id', 'first_name')
         .from('users')
         .where('user_id', req.session.user)
         .then((result) => {
           templateVars.user = result[0];
           knex.select('*')
                 .from('articles')
                 .orderBy("created_at", "desc")
                 .then((results) => {
                   templateVars.articles = [];
                   for (let article of results) {
                     templateVars.articles.push(article);
                   }
                   res.render("Main", templateVars);
                 });
     });

    } else {
     res.redirect("/login")
    }
  });

  router.get("/search", (req, res) => {
    let input = req.query.search;
    let inputlower = input.toLowerCase();
    let templateVars = {};
    templateVars.query = input;

    knex("articles")
        .select("*")
        .whereRaw(`lower(title) LIKE '%${inputlower}%'`)
        .orWhereRaw(`lower(description) LIKE '%${inputlower}%'`)
        .then((results) => {
          templateVars.articles = [];
          for (let article of results) {
            templateVars.articles.push(article);
          }
          knex.select('user_id', 'first_name')
         .from('users')
         .where('user_id', req.session.user)
         .then((results) => {
           templateVars.user = results[0];
           res.render("search", templateVars);
        });
    });
  });

  router.get("/:article_id",(req,res) =>{
      let article_id = req.params.article_id;
      let templateVars ={};

      knex.select('user_id', 'first_name')
          .from('users')
          .where('user_id', req.session.user)
          .then((result) => {
            templateVars.user = result[0];
      });

      knex('articles')
       .innerJoin("users", "articles.contributor", "users.user_id")
       .where({article_id :article_id})
       .select('*')
       .orderBy("created_at", "desc")
       .then ((result) => {
           // console.log(result);
          templateVars.article = result[0];
          // templateVars.user = result[0]
          knex("comments")
            .select("*")
            .where("article", templateVars.article.article_id)
            .orderBy("created_at", "desc")
            .then((result) => {
              // console.log(result)
              templateVars.comments = [];
              for (let comment of result) {
                // console.log(comment)
                templateVars.comments.push(comment);

              }
              // console.log(templateVars);
              res.render("article", templateVars);
            });

       });
  });


  //CREATE A NEW ARTICLE
  router.post("/", (req, res) => {
    let artURL = req.body.url;
    let artTitle = req.body.title;
    let artDescription = req.body.text;
    let artCategory = req.body.inlineRadioOptions;
    let artUserId = req.session.user;
    let artImage = req.body.image;

    knex('articles')
        .increment('article_id', 1)
        .insert({url: artURL,
                title: artTitle,
                description: artDescription,
                category: artCategory,
                contributor: artUserId,
                image: artImage
              })
        .returning('article_id')
        .then((article_id) => {
          res.redirect(`/articles/${article_id}`);
         });
  });


  // //UPDATE ARTICLE DETAILS
  // router.get("/articles/:article_id", (req, res) => {
  //   let article_id = req.params.article_id;
  //   let artURL = req.body.cardURL;
  //   let artTitle = req.body.artTitle;
  //   let artDescription = req.body.cardDescription;
  //   let artCategory = req.body.artCategory;
  //   let artUserId = req.session.userId;

  //   knex('articles')
  //       .where({id: article_id})
  //       .update({url: artURL,
  //               title: artTitle,
  //               description: artDescription,
  //               category_id: artCategory,
  //               user_id: artUserId})
  //       .then((results) => {
  //       res.json(results);
  //      });
  // });



  //DELETE ARTICLE
  router.delete("/:article_id", (req, res) => {
    knex.select('*')
        .from("articles")
        .where("id", req.params.article_id)
        .del()
        .then((results) => {
         res.json(results);
        });
  });

  return router;
};
