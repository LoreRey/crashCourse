
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable("users", function (table) {
      table.string("password");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable("users", function (table) {
      table.dropColumn("password");
    })
  ]);
};
