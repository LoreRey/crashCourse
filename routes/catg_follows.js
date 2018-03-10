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
        res.json(results)
      });
});


//SHOWS CATEGORY FOLLOWS TO USER
router.get("/:category" , (req, res) => {
  knex.select('*')
      .from('follows')
      .where({id : req.session.user})
      .andWhere({category_id : req.params.category})
      .then((results) => {
        res.render('profile')
      });
});


  return router

}
