"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {



//CREATES A LIKE
router.post('/:article_id', (req, res) => {
  let liked = { user_id : req.session.user,
                article : req.params.article_id
              }

  knex('likes')
        .select('*')
        .where('user_id', req.session.user)
        .andWhere('article', req.params.article_id)
        .then((result) => {
          console.log("billy", result)
          if (result === [] ) {
            knex('likes')
                .insert(liked)
                // .returning("article")
                .then((result) => {
                  res.redirect(`/articles/${req.params.article_id}`)
                   })
          } else {
            knex('likes')
              .where({'user_id' : req.session.user,
                      'article' : req.params.article_id})
              .del()
              .then((results) => {
                  res.redirect(`/articles/${req.params.article_id}`)
              });

          }
        })
 });

router.get('/:article_id/favourites', (req, res) => {
  knex.select('*')
      .from('likes')
      .innerJoin('articles', 'likes.article', 'articles.article_id')
      .where('likes.user_id', req.session.user)
      .then((results) => {
        res.json(results);
      });
});


// //DELETES A LIKE
// router.delete('/:article_id', (req, res) => {
//   knex('likes')
//       .where({'user_id' : req.session.user,
//              'article_id' : req.params.article_id})
//       .del()
//       .then((results) => {
//        res.json(results)
//       });
// });


return router

}
