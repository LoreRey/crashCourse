$(document).ready(function() {
  console.log("HI");
  function renderComments (comments)  {
    for(let i = 0; i<comments.length; i++) {
      let commentBlock = comments[i].comment_text;
      console.log(commentBlock);
      $(".comments").prepend($(`<div><p>${commentBlock}</p></div>`));
    }
  }
  renderComments(comments);
});

