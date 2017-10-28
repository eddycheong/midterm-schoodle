$(() => {


  function CreateNewName (name) {

    return

      $("button").click(function(){
      $("p").prepend("name that I am grabing");
    });

  };



  function getNameAndRender() {


    $('').on('submit', function (event) {


    $.ajax({
        method: 'POST',
        url: '/routes', ??go to the server and render ?
        success(attendee) {
        renderRoutes(attendee);
        }
    });

  });


  getNameAndRender();

});

