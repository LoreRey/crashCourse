$(() => {
  $.ajax({
    method: "GET",
    url: "/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });


  // Get article images
  $.ajax({
    method: "GET",
    url: "/articles"
  }).done((articles) => {
    for(article of articles) {
      let articleCard = `<div class = "thumbnail">
            <img src="${article.image}">
          </div>`;
      $(".container").prepend($(`<div class = 'col-lg-4 col-sm-6'>${articleCard}</div>`));
    }
  });

  // $.ajax({
  //   method: "POST",
  //   url: "/api/users/register"
  // }).done((register) => {

  // }

  // })



});
