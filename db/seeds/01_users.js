exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({user_id: 1,
                              first_name: "Geoff",
                              last_name: "Coutts",
                              email: "geoff@crashcourse.com",
                              username: "gcoutts",
                              password: "123"
                            }),
        knex('users').insert({user_id: 2,
                              first_name: "Lorena",
                              last_name: "Reyes",
                              email: "Lorena@crashcourse.com",
                              username: "lreyes",
                              password: "123"
                            }),
        knex('users').insert({user_id: 3,
                              first_name: "Calvin",
                              last_name: "Yah",
                              email: "Calvin@crashcourse.com",
                              username: "cyah",
                              password: "123"
                            }),
      ]);
    });
};
