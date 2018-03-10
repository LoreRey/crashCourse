
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("users", function (table) {
      table.renameColumn("id", "user_id");
      table.string("first_name");
      table.string("last_name");
      table.string("email");
      table.renameColumn("name", "username");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("users", function (table) {
      table.renameColumn("user_id", "id");
      table.dropColumn("first_name");
      table.dropColumn("last_name");
      table.dropColumn("email");
      table.renameColumn("username", "name");
    })
  ]);
};
