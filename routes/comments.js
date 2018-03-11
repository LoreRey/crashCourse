"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //POSTS NEW ARTICLE COMMENT
  router.post("/:article_id", (req, res) => {
    console.log("Hi");
    let data = { article: req.params.article_id,
                 user_id: req.session.user,
                 comment_text: req.body.newComment
                 // rating: req.body.rating
               }
               console.log("hi11",data);
    // if(rating)  {  
    //   data.rating ++
    // }

    knex('comments')
        .increment('comment_id',1)
        .insert(data)
        .returning("likes")
        .then((likes) => {
          console.log("hi2")
          res.redirect(`/articles/${likes}`)
    })
         // res.redirect(`/articles/${article_id}`);
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
