
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("comments", function (table) {
      table.increments("comment_id").unsigned();
      table.integer("article").references("articles.article_id").unsigned();
      table.string("username").references("users.username");
      table.string("comment_text");
      table.integer("rating").unsigned();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("comments")
  ]);
};
