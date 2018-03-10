
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("follows").del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex("follows").insert({user_id: 1, category_id: 1}),
        knex("follows").insert({user_id: 1, category_id: 2}),
        knex("follows").insert({user_id: 1, category_id: 3}),
        knex("follows").insert({user_id: 2, category_id: 4}),
        knex("follows").insert({user_id: 2, category_id: 2}),
        knex("follows").insert({user_id: 2, category_id: 1}),
        knex("follows").insert({user_id: 3, category_id: 5}),
        knex("follows").insert({user_id: 3, category_id: 1}),
        knex("follows").insert({user_id: 3, category_id: 4}),
      ]);
    });
};
