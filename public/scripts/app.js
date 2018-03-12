$(() => {

//GET ARTICLE LIKES
$('#thumbsup').click(function(event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/likes",
      success: function(response){
      },
    })
  });
//DELETE LIKES
$('#thumbsdown').click(function(event) {
    event.preventDefault();
    $.ajax({
      method: "DELETE",
      url: "/likes",
      success: function(response){
      },
    })
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
