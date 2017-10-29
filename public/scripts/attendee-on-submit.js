
$( document ).ready(function() { 

  $('#attendee-form-submit-button').one('click', function() {
      $('<input id="editBtn" class="btn btn-primary btn-lg"></input>').attr({'type': 'button'}).val("Edit Your Entry").click(function(){
      }).appendTo($('th.proposal-display-table-headers'));

    $('#editBtn').on('click', function() {
      location.reload();
    })    
  });


});
