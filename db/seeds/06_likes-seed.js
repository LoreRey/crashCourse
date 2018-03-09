
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("likes").del()
    .then(function () {
      // Inserts seed entries
      return knex("likes").insert([
        {like_id: 1, article: 9, username:"gcoutts"},
        {like_id: 2, article: 2, username:"gcoutts"},
        {like_id: 3, article: 3, username:"gcoutts"},
        {like_id: 4, article: 8, username:"gcoutts"},
        {like_id: 5, article: 2, username:"lreyes"},
        {like_id: 6, article: 1, username:"lreyes"},
        {like_id: 7, article: 5, username:"lreyes"},
        {like_id: 8, article: 12, username:"lreyes"},
        {like_id: 9, article: 6, username:"lreyes"},
        {like_id: 10, article: 13, username:"cyah"},
        {like_id: 11, article: 1, username:"cyah"},
        {like_id: 12, article: 11, username:"cyah"},
        {like_id: 13, article: 12, username:"cyah"},
        {like_id: 14, article: 7, username:"cyah"}
      ]);
    });
};
