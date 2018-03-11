"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //SETS A FOLLOW RECORD
  router.post("/:category" , (req, res) => {
    knex('follows')
        .insert({user_id : req.session.user,
                 category_id : req.params.category
                })
        .then((results) => {
          res.json(results);
        });
  });




//   //SHOWS CATEGORY FOLLOWS TO USER
//   router.get("/profile" , (req, res) => {
//     let templateVars = {};
//     if (req.session.user) {
//       knex.select('user_id', 'first_name')
//           .from('users')
//           .where('user_id', req.session.user)
//           .then((result) => {
//             templateVars.user = result[0];
//             console.log(templateVars);
//       });
// // TODO: PUT AN INNER JOIN TO LINK FOLLOWS TO ARTICLES
//     knex.select('*')
//         .from('follows')
//         .where('user_id', req.session.user)
//         .then((results) => {
//           res.render('profile', templateVars);
//         });
//     }
//   });

  //SHOWS ARTICLES IN A CATEGORY
  router.get("/:category" , (req, res) => {
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
                .where('category', req.params.category)
                .innerJoin("categories", "category", "category_id")
                .orderBy("created_at", "desc")
                .then((results) => {
                  // console.log(results)
                  templateVars.articles = [];
                  for (let article of results) {
                    // console.log(article)
                    templateVars.articles.push(article);
                  }
                  console.log(templateVars)
                  res.render('category', templateVars);
                });
      });
    }
  });

  return router;

};
