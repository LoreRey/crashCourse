
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("categories", function (table) {
      table.increments("category_id").primary();
      table.string("cat_name");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists("categories")
  ]);
};
