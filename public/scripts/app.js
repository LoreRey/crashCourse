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


});
