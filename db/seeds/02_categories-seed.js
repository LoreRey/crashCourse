
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex("categories").insert({category_id: 1 ,cat_name: "Biology"}),
        knex("categories").insert({category_id: 2 ,cat_name: "Math"}),
        knex("categories").insert({category_id: 3 ,cat_name: "Physics"}),
        knex("categories").insert({category_id: 4 ,cat_name: "Computer Science"}),
        knex("categories").insert({category_id: 5 ,cat_name: "Languages"})
      ]);
    });
};
