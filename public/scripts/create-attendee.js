$(() => {
  // function CreateNewName(name) {

  //   return

  //   $("button").click(function () {
  //     $("p").prepend("name that I am grabing");
  //   });

  // };

  function getNameAndRender() {
    $('form').on('submit', function (event) {
      event.preventDefault();

      const route = $(this).attr("action");

      const newAttendee = $(this);

      $.ajax({
        method: 'POST',
        url: route,
        data: newAttendee.serialize()
      })
        .done(() => {
          $(".proposal-display-table-checkbox")
            .closest('.display-table-row')
            .css('display', 'none');

          const newRow = {};

          newAttendee.serializeArray().forEach(elem => {
            if (elem.name === "attendeeName") {
              newRow["attendeeName"] = elem.value;
            }
          });

          const name = $("<td>")
            .addClass("proposal-display-table-attendee-name")
            .text(newRow.attendeeName);

          const response = () => {
            return $("<td>")
            .append(
              $("<i>").addClass("fa fa-check")
            )
          }

          const row = $("<tr>").addClass("display-table-row")
            .append(name)

          for(let i=0; i<3; i++){
            row.append(response());
          }
          $("tbody").append(row);
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

