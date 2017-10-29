$(() => {

  function buildAttendeeResponses(array) {
    return {
      attendeeName: array[0],
      attendeeEmail: array[1],
      responses: array.slice(2, array.length)
    }
  }

  function getNameAndRender() {
    $('form').on('submit', function (event) {
      event.preventDefault();

      const route = $(this).attr("action");
      const newAttendee = $(this);

      $.ajax({
        method: 'POST',
        url: route,
        data: buildAttendeeResponses(newAttendee.serializeArray())
      })
        .done(() => {

          $("#attendee-input")
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

          $("tbody").append(row);
        });
    });
  }
  
  getNameAndRender();
});

