$(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;



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
