// Table used as joint between users and categories (many to many connection)

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("follows", function(table) {
      table.integer("category_id").references("categories.category_id");
      table.integer("user_id").references("users.user_id");
      table.primary(["category_id", "user_id"]);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists("follows")
  ]);
};
