
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('articles').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('articles').insert({article_id: 1,
                                 category: 4,
                                 contributor: 1,
                                 image: "https://i.ytimg.com/vi/0JUN9aDxVmI/hqdefault.jpg",
                                 url: "https://www.youtube.com/watch?v=0JUN9aDxVmI",
                                 description: "Check out this great video lecture about advanced algorithms",
                                 title: "Advanced Algorithms Lecture"
                               }),
        knex('articles').insert({article_id: 2,
                                 category: 5,
                                 contributor: 3,
                                 image: "https://writingexplained.org/wp-content/uploads/then.png",
                                 url: "https://writingexplained.org/then-vs-than-difference",
                                 description: "If then vs than always stumps you, check out this great article that helps explain it.",
                                 title: "Then vs Than"
                               }),
        knex('articles').insert({article_id: 3,
                                 category: 2,
                                 contributor: 2,
                                 image: "https://i.pinimg.com/736x/4d/a0/14/4da014fcaa1d53a5772440666bbb41df--math-teacher-teaching-math.jpg",
                                 url: "https://www.pinterest.ca/pin/169166529730660072/",
                                 description: "Incase you ever forget how to do math!",
                                 title: "BEDMAS picture"
                               }),
        knex('articles').insert({article_id: 4,
                                 category: 1,
                                 contributor: 1,
                                 image: "http://www.e-tutor.com/lsnpics/52133_title1.jpg",
                                 url: "http://www.e-tutor.com/et3/lessons/view/52133/print",
                                 description: "Great resource for the anatomy of a frog. Used it for my test last week.",
                                 title: "Anatomy of a Frog"
                               }),
        knex('articles').insert({article_id: 5,
                                 category: 4,
                                 contributor: 3,
                                 image: "https://cdn.scotch.io/15139/DjfmuO2ARKqOCd3JR9XA_solution-alien-challenge-cover.jpg",
                                 url: "https://scotch.io/bar-talk/build-an-eye-tracking-alien-with-javascript-solution-to-code-challenge-4",
                                 description: "This is a great exercise for building a cool functionality in JS!",
                                 title: "Mouse Tracking With Javascript"
                               }),
        knex('articles').insert({article_id: 6,
                                 category: 1,
                                 contributor: 2,
                                 image: "https://i.ytimg.com/vi/fGG7CSZUIMI/maxresdefault.jpg",
                                 url: "https://www.youtube.com/watch?v=fGG7CSZUIMI",
                                 description: "Check out this video about some of the worst diseases out there. Absolutely scary, but interesting!",
                                 title: "Video About Scary Diseases"
                               }),
        knex('articles').insert({article_id: 7,
                                 category: 4,
                                 contributor: 1,
                                 image: "https://www.git-tower.com/blog/content/posts/54-git-cheat-sheet/git-cheat-sheet-large01.png",
                                 url: "https://www.git-tower.com/blog/git-cheat-sheet/",
                                 description: "Ever get confused by github or forget what the commands are? Then save this cheat sheet and you'll never have problems again.",
                                 title: "Github Cheat Sheet"
                               }),
        knex('articles').insert({article_id: 8,
                                 category: 1,
                                 contributor: 3,
                                 image: "https://i.kinja-img.com/gawker-media/image/upload/s--r4yMNJbR--/c_scale,fl_progressive,q_80,w_800/zppfok9vf7svttojh5u6.gif",
                                 url: "https://gizmodo.com/these-hackers-built-a-prosthetic-nerf-blaster-that-can-1823613912",
                                 description: "These people made a nerfblaster prosthetic! That's so cool!",
                                 title: "NERF GUN PROSTHETIC!!!"
                               }),
        knex('articles').insert({article_id: 9,
                                 category: 5,
                                 contributor: 1,
                                 image: "https://dkru86weszx9t.cloudfront.net/blog/wp-content/uploads/2016/02/Blog_Professionals.jpg",
                                 url: "https://www.grammarly.com/blog/10-best-grammar-resources-for-professionals/",
                                 description: "This page has a few links to other resources for grammar tips in the workplace. I'll always know where to go now.",
                                 title: "Workplace Grammar Help Resource"
                               }),
        knex('articles').insert({article_id: 10,
                                 category: 2,
                                 contributor: 2,
                                 image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Integral_example.svg/1200px-Integral_example.svg.png",
                                 url: "https://en.wikipedia.org/wiki/Integral",
                                 description: "Ever wonder how to calculate integrals? Well nothing beats Wikipedia in looking something up.",
                                 title: "Integrals Aren't Scary Anymore"
                               }),
        knex('articles').insert({article_id: 11,
                                 category: 3,
                                 contributor: 1,
                                 image: "https://i.ytimg.com/vi/Vi91qyjuknM/maxresdefault.jpg",
                                 url: "https://www.youtube.com/watch?v=Vi91qyjuknM",
                                 description: "Quick video explaining electrons, protons, and neutrons. Very handy!",
                                 title: "Video on Electrons, Protons, and Neutrons"
                               }),
        knex('articles').insert({article_id: 12,
                                 category: 3,
                                 contributor: 3,
                                 image: "http://www.nature.com/polopoly_fs/7.45361.1500457451!/image/gyroid%20ONLINE.jpg_gen/derivatives/nature_homepage/gyroid%20ONLINE.jpg",
                                 url: "https://www.youtube.com/watch?v=0JUN9aDxVmI",
                                 description: "I might be even more confused than I was before, but if you're interested in topological physics, check this out",
                                 title: "How Topology is Changing Physics"
                               }),
        knex('articles').insert({article_id: 13,
                                 category: 2,
                                 contributor: 2,
                                 image: "http://mathworld.wolfram.com/images/eps-gif/SphericalCap_1001.gif",
                                 url: "http://mathworld.wolfram.com/SphericalCap.html",
                                 description: "I haven't understood how to calculate the volume of a spherical cap ever since my lecture on it last week. It finally makes sense now!",
                                 title: "Spherical Caps"
                               }),
      ]);
    });
};
