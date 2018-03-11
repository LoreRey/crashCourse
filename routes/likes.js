// "use strict";

// const express = require('express');
// const router  = express.Router();

// module.exports = (knex) => {

// //CREATES A LIKE
// router.post('/:article_id', (req, res) => {
//   let liked = {user_id : req.session.user,
//                article_id: req.params.article_id
//               }
// console.log(liked);
//   knex('likes')
//       .insert(liked)
//        .returning("like")
//         .then((article) => {
//           console.log("hi2")
//           res.redirect(`/articles/${article}`)


//       .then((results) => {
//         res.json(results);
//       });
// });


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


// return router

// }
