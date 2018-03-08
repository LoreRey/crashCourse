"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (knex) => {


//SEE ALL AVAILABLE ARTICLES
  router.get("/articles", (req, res) => {
    res.render("articles");
    //knex query
  });

//CREATE A NEW ARTICLE
  router.post("/articles/new", (req, res) => {
    let artURL = req.body.cardURL;
    let artTitle = req.body.artTitle;
    let artDescription = req.body.cardDescription;
    let artCategory = req.body.artCategory;
    let artUserId = req.session.userId;

    knex('articles')
       .insert({url: artURL,
                title: artTitle,
                description: artDescription,
                category_id: artCategory,
                user_id: artUserId})
       .then((results) => {
        response.json(results);
       });
  });

//UPDATE ARTICLE DETAILS
router.get("/articles/article_id", (req, res) => {
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
      response.json(results);
     });
});

//RENDER ARTICLES BY CATEGORY
  router.get("/science", (req, res) => {
    res.render("science")
  }

  router.get("/math", (req, res) => {
    res.render("math")
  }

  router.get("/technology", (req, res) => {
    res.render("technology")
  }

  router.get("/geography", (req, res) => {
    res.render("geography")
  }

//DELETE ARTICLE //*****FIX URL****//
router.delete("/:article_id...", (req, res) => {
  knex
     .select('*')
     .from("articles")
     .where("id", req.params.article_id)
     .andWhere("user_id", req.params.user)
     .del()
     .then((results) => {
      res.json(results)
     });
});

  return router;
}
