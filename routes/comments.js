"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //POSTS NEW ARTICLE COMMENT
  router.post("/articles/:article_id/comments", (req, res) => {
    let data = { article_id: req.params.article_id,
                 user_id: req.session.user,
                 comment_text: req.body.comment,
                 rating: req.body.rating
               }

    if(rating)  {
      data.rating ++
    }

    knex('comments')
        .insert(data)
        .then((results) => {
          res.json(results)
    })
  });

  //RENDERS ARTICLE COMMENTS
  // router.get("/articles/:article_id/comments", (req, res) => {
  //   knex.select('*')
  //       .from('comments')
  //       .where('article_id', req.params.article_id)
  //       .then((results) => {
  //         res.json(results)
  //       });
  // })

  return router

}
