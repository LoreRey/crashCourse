
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("likes").del()
    .then(function () {
      // Inserts seed entries
      return knex("likes").insert([
        {like_id: 1, article: 9, user_id:1},
        {like_id: 2, article: 2, user_id:1},
        {like_id: 3, article: 3, user_id:1},
        {like_id: 4, article: 8, user_id:1},
        {like_id: 5, article: 2, user_id:2},
        {like_id: 6, article: 1, user_id:2},
        {like_id: 7, article: 5, user_id:2},
        {like_id: 8, article: 12, user_id:2},
        {like_id: 9, article: 6, user_id:2},
        {like_id: 10, article: 13, user_id:3},
        {like_id: 11, article: 1, user_id:3},
        {like_id: 12, article: 11, user_id:3},
        {like_id: 13, article: 12, user_id:3},
        {like_id: 14, article: 7, user_id:3}
      ]);
    });
};
