// Articles table with resources

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("users", function (table) {
      table.unique("username");
    }),
    knex.schema.createTable("articles", function (table) {
      table.increments("article_id").unsigned();
      table.integer("category").references("categories.category_id").unsigned();
      table.string("contributor").references("users.username");
      table.string("image");
      table.string("url");
      table.string("description");
      table.string("title");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("articles"),
    knex.schema.table("users", function (table) {
      table.dropUnique("username");
    })
  ]);
};
