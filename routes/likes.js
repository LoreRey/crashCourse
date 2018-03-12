"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {



//RENDERS USER LIKES
router.get('/', (req, res) => {
  if (req.session.user) {
    let templateVars = {};
    knex.select('*')
      .from('likes')
      .innerJoin('articles', 'likes.article', 'articles.article_id')
      .where('likes.user_id', req.session.user)
      .then((results) => {
           templateVars.articles = [];
           for (let article of results) {
             templateVars.articles.push(article);
           }
           knex.select('user_id', 'first_name')
             .from('users')
             .where('user_id', req.session.user)
             .then((result) => {
              templateVars.user = result[0];
                 res.render("Main", templateVars);
                 });
      })
  } else {
    res.redirect("/login")
  }
});


//CREATES A LIKE
router.post('/:article_id', (req, res) => {
  let liked = { user_id : req.session.user,
                article : req.params.article_id
              }
  knex('likes')
        .insert(liked)
        // .select('*')
        .where('user_id', req.session.user)
        .andWhere('article', req.params.article_id)
        //.raw('? ON CONFLICT DO NOTHING')
        .then((result) => {
          res.redirect(`/articles/${req.params.article_id}`)
        });
        //  console.log("billy", result)
          // let result2 = JSON.stringify(result)
          // console.log("billy2", result2)
          // if (result === "[]") {
          //   knex('likes')
          //       .insert(liked)
          //       // .returning("article")
          //       .then((result) => {
          //         res.redirect(`/articles/${req.params.article_id}`)
          //          })
        //   } else {
        //     knex('likes')
        //       .where({'user_id' : req.session.user,
        //               'article' : req.params.article_id})
        //       .del()
        //       .then((results) => {
        //           res.redirect(`/articles/${req.params.article_id}`)
        //       });

        //   }
        // })
 });




//DELETES A LIKE
router.delete('/:article_id', (req, res) => {
  knex('likes')
      .where({'user_id' : req.session.user,
             'article_id' : req.params.article_id})
      .del()
      .then((result) => {
       res.redirect(`/articles/${req.params.article_id}`)
      });
});


return router

}
