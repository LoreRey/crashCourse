
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("comments").del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex("comments").insert([{comment_id: 1,
                                  article: 2,
                                  username: "gcoutts",
                                  comment_text: "OMG.. I get those wrong all the time. Thanks!"
                                },
                                {comment_id: 2,
                                  article: 13,
                                  username: "gcoutts",
                                  comment_text: "Now I can answer questions on this in class."
                                },
                                {comment_id: 3,
                                  article: 6,
                                  username: "gcoutts",
                                  comment_text: "GROSS!"
                                },
                                {comment_id: 4,
                                  article: 1,
                                  username: "cyah",
                                  comment_text: "I'm gonna start applying this stuff to my code right away."
                                },
                                {comment_id: 5,
                                  article: 3,
                                  username: "cyah",
                                  comment_text: "Thanks so much. I never remember if I should multiply before or after I subtract..."
                                },
                                {comment_id: 6,
                                  article: 13,
                                  username: "cyah",
                                  comment_text: "Me too!"
                                },
                                {comment_id: 7,
                                  article: 6,
                                  username: "cyah",
                                  comment_text: "Agreed! I hope I never get any of those!"
                                },
                                {comment_id: 8,
                                  article: 1,
                                  username: "lreyes",
                                  comment_text: "Great video"
                                },
                                {comment_id: 9,
                                  article: 8,
                                  username: "lreyes",
                                  comment_text: "...I kind of want one..."
                                },
                                {comment_id: 10,
                                  article: 7,
                                  username: "lreyes",
                                  comment_text: "Thank you! Now I'll be a master at making feature branches."
                                },
                                {comment_id: 11,
                                  article: 12,
                                  username: "lreyes",
                                  comment_text: "wut..."
                                }

        ])
      ]);
    });
};
