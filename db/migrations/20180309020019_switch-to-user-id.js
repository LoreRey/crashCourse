
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("comments"),
    knex.schema.dropTable("likes"),
    knex.schema.dropTable("articles"),
    knex.schema.createTable("articles", function (table) {
      table.increments("article_id").unsigned();
      table.integer("category").references("categories.category_id").unsigned();
      table.integer("contributor").references("users.user_id");
      table.string("image");
      table.string("url");
      table.string("description");
      table.string("title");
    }),
    knex.schema.createTable("comments", function (table) {
      table.increments("comment_id").unsigned();
      table.integer("article").references("articles.article_id").unsigned();
      table.integer("user_id").references("users.user_id");
      table.string("comment_text");
      table.integer("rating").unsigned();
    }),
    knex.schema.createTable("likes", function (table) {
      table.increments("like_id").unsigned();
      table.integer("article").references("articles.article_id").unsigned();
      table.integer("user_id").references("users.user_id");
      table.integer("like_val").unsigned();
    })
  ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
    knex.schema.dropTable("comments"),
    knex.schema.dropTable("likes"),
    knex.schema.dropTable("articles"),
    knex.schema.createTable("articles", function (table) {
      table.increments("article_id").unsigned();
      table.integer("category").references("categories.category_id").unsigned();
      table.string("contributor").references("users.username");
      table.string("image");
      table.string("url");
      table.string("description");
      table.string("title");
    }),
    knex.schema.createTable("comments", function (table) {
      table.increments("comment_id").unsigned();
      table.integer("article").references("articles.article_id").unsigned();
      table.string("username").references("users.username");
      table.string("comment_text");
      table.integer("rating").unsigned();
    }),
    knex.schema.createTable("likes", function (table) {
      table.increments("like_id").unsigned();
      table.integer("article").references("articles.article_id").unsigned();
      table.string("username").references("users.username");
      table.integer("like_val").unsigned();
    })
  ]);
};
