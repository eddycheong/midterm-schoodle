$(() => {
  // function CreateNewName(name) {

  //   return

  //   $("button").click(function () {
  //     $("p").prepend("name that I am grabing");
  //   });

  // };

  function getNameAndRender() {
    $('form').on('submit', function(event) {
        event.preventDefault();

        const route = $(this).attr("action");
        
        $.ajax({
          method: 'POST',
          url: route,
          data: $(this).serialize()
        })
        .done(response => {
          console.log(response);
        });
    });
  }

  // function getNameAndRender() {
  //   $('').on('submit', function (event) {h
  //     //   url: '/routes', ??go to the server and render ?
  //     //     success(attendee) {
  //     //       renderRoutes(attendee);
  //     //     }
  //     // });
  //   });

    getNameAndRender();
});

