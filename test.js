//---------------------------------------------------------------- filtering user likes
  $('.form-control.like').change(function(){
    const likesFilterValue = this.value;
    console.log(likesFilterValue);
    if (likesFilterValue != 0) {
      $.ajax({
      method: "GET",
      url: `/api/resources/user/likes/${likesFilterValue}`
    }).done((resources) => {
      console.log(resources);
        renderUserResources(resources);
      });
    } else {
      fetchingAndRendering();
    }
  });


});


//JS FUNCTIONS

function addUserFavClickHandlers($card, resourceID) {

  function addUserFavourite($card, resourceID) {
  var url = `/api/resources/${resourceID}`;

    $card.find('.rating-form-inc').on('submit', function(e){
      var resourceID = resourceID;
      e.preventDefault();
      $.ajax({
        method: "post",
        url: url + '/inc',
        success: function(result, error){
        },
        error: function(error){
          console.log(error);
        }
      });
    });

  };

  function removeUserFavourite($card, resourceID) {
    var url = `/api/resources/${resourceID}`;


    $card.find('.rating-form-dec').on('submit', function(e){
      var resourceID = resourceID;
      e.preventDefault();
      $.ajax({
        method: "post",
        url: url + '/dec',
        success: function(result, error){
        },
        error: function(error){
          console.log(error);
        }
      });
    });
  };

  addUserFavourite($card, resourceID);
  removeUserFavourite($card, resourceID);
};


