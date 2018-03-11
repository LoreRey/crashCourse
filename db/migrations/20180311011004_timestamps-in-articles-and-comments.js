
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("articles", function (table) {
      table.timestamp("created_at").defaultTo(knex.fn.now());

    }),
    knex.schema.table("comments", function (table) {
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("articles", function (table) {
      table.dropColumn("created_at");

    }),
    knex.schema.table("comments", function (table) {
      table.dropColumn("created_at");
    })
  ]);
};
