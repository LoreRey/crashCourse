
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex("likes").del(),
    knex("comments").del(),
    knex("articles").del(),
    knex("follows").del(),
    knex("categories").del(),
    knex("users").del()
    ]);
};
