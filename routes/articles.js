"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");

module.exports = (knex) => {


  //SEE ALL AVAILABLE ARTICLES
  router.get("/", (req, res) => {
    knex.select("*")
        .from('articles')
        // .orderBy('created_at', 'desc')
        .then((results) => {
          // console.log(results)
          res.json(results);
        });

    });

  //CREATE A NEW ARTICLE
  router.post("/", (req, res) => {
    let artURL = req.body.cardURL;
    let artTitle = req.body.artTitle;
    let artDescription = req.body.cardDescription;
    let artCategory = req.body.Category;
    // let artUserId = req.session.userId;

    knex('articles')
        .insert({url: artURL,
                title: artTitle,
                description: artDescription,
                category: artCategory,
                // user_id: artUserId
              })
        .then((results) => {
        res.json(results);
        });
  });


  //UPDATE ARTICLE DETAILS
  router.get("/articles/:article_id", (req, res) => {
    let article_id = req.params.article_id;
    let artURL = req.body.cardURL;
    let artTitle = req.body.artTitle;
    let artDescription = req.body.cardDescription;
    let artCategory = req.body.artCategory;
    let artUserId = req.session.userId;

    knex('articles')
        .where({id: article_id})
        .update({url: artURL,
                title: artTitle,
                description: artDescription,
                category_id: artCategory,
                user_id: artUserId})
        .then((results) => {
        res.json(results);
       });
  });

  //RENDER ARTICLES BY CATEGORY
  router.get("/:category" , (req, res) => {
    knex.select('*')
        .from('articles')
        .where('category', req.params.category)
        .orderBy('created_at', 'desc')
        .then((results) => {
          res.json(results);
        });
  });

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
