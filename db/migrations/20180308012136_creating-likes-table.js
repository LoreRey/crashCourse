
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("likes", function (table) {
      table.increments("like_id").unsigned();
      table.integer("article").references("articles.article_id").unsigned();
      table.string("username").references("users.username");
      table.integer("like_val").unsigned();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("likes")
  ]);
};
