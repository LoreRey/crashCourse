$(() => {



$('.commentButton').click(function(){
    console.log("clicked");
    if($('#textBox').is(':hidden')){
      console.log('hidden');
    $('#textBox').slideDown('slow');
    $('#textBox').focus();
  }
  else{
    $('#textBox').slideUp('slow');
  }
 });

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
            <a href="/articles/:${article.article_id}" ><img src="${article.image}"></a>
          </div>`;
      $(".container").prepend($(`<div class = 'col-lg-4 col-sm-6'>${articleCard}</div>`));
    }
  });


$('.commentButton').click(function(){
    console.log("clicked");
    if($('#textBox').is(':hidden')){
      console.log('hidden');
    $('#textBox').slideDown('slow');
    $('#textBox').focus();
  }
  else{
    $('#textBox').slideUp('slow');
  }
 });




});
