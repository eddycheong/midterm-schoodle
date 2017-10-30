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


      // Make Edit Button
      $('<input id="editBtn" class="btn btn-primary btn-lg"></input>').attr({'type': 'button'}).val("Edit Your Entry").click(function(){
      }).appendTo($('th.proposal-display-table-headers'));

      // Hide Submit Row
      $('#user-submit-name, #user-submit-email').css('display', 'none');
      $('#attendee-form-submit-button').text('Submit Edit').css('float', 'right');
          $("#attendee-input")
            .closest('.display-table-row')
            .css('display', 'none');
      // Add New Text
      $('#attendee-input').append('Edit Your Response');
      


      // Add new Row With Attendee
          const newRow = {};

          newAttendee.serializeArray().forEach(elem => {
            if (elem.name === "attendeeName") {
              newRow["attendeeName"] = elem.value;
            }
          });

          const name = $("<td>")
            .addClass("proposal-display-table-attendee-name")
            .text(newRow.attendeeName);

          // add attendee responses per date
          const attendeeFullResponses = newAttendee.serializeArray();
          const attendeeCheckboxAnswers = attendeeFullResponses.slice(2, attendeeFullResponses.length)

          const yesDateOptions = (attendeeCheckboxAnswers
            ? attendeeCheckboxAnswers.reduce((obj, item) => (obj[item.name] = item.value, obj), {})
            : {});

          // determines check or X graphic 
          const response = (answer) => {
            if(answer) {
              return $("<td>")
              .append(
                $("<i>").addClass("fa fa-check")
              );  
            }

            return $("<td>")
            .append(
              $("<i>").addClass("fa fa-times")
            );
          }

          const row = $("<tr>").addClass("display-table-row")
            .append(name)

          const eventRows = $('thead > tr').children();
          const eventDateOptions = eventRows.slice(1, eventRows.length);

          eventDateOptions.each(function(index, elem) {
            const answer = yesDateOptions[$(elem).data('id')];
            row.append(response(!!answer))
          });

          $("tbody").append(row);
        });
    });
  }


  


//
//
  // $.ajax({
  //   method: 'PUT',
  //   url: route,   // right route
  //   data: buildAttendeeResponses(newAttendee.serializeArray())   // ?
  // })
  //   .done(() => {

  // // Show new ROW

  // $('<input id="editBtn" class="btn btn-primary btn-lg"></input>').attr({'type': 'button'}).val("Edit Your Entry").click(function(){
  // }).appendTo($('th.proposal-display-table-headers'));

  // // Add new Row With Attendee
  //     $("#attendee-input")
  //       .closest('.display-table-row')
  //       .css('display', 'none');

  //     const newRow = {};

  //     newAttendee.serializeArray().forEach(elem => {
  //       if (elem.name === "attendeeName") {
  //         newRow["attendeeName"] = elem.value;
  //       }
  //     });

  //     const name = $("<td>")
  //       .addClass("proposal-display-table-attendee-name")
  //       .text(newRow.attendeeName);

  //     const attendeeFullResponses = newAttendee.serializeArray();
  //     const attendeeCheckboxAnswers = attendeeFullResponses.slice(2, attendeeFullResponses.length)

  //     const yesDateOptions = (attendeeCheckboxAnswers
  //       ? attendeeCheckboxAnswers.reduce((obj, item) => (obj[item.name] = item.value, obj), {})
  //       : {});

  //     console.log(attendeeCheckboxAnswers);
  //     console.log("yes date: ", yesDateOptions);


  //     const response = (answer) => {
  //       if(answer) {
  //         return $("<td>")
  //         .append(
  //           $("<i>").addClass("fa fa-check")
  //         );  
  //       }

  //       return $("<td>")
  //       .append(
  //         $("<i>").addClass("fa fa-times")
  //       );
  //     }

  //     const row = $("<tr>").addClass("display-table-row")
  //       .append(name)

  //     const eventRows = $('thead > tr').children();
  //     const eventDateOptions = eventRows.slice(1, eventRows.length);

  //     eventDateOptions.each(function(index, elem) {
  //       const answer = yesDateOptions[$(elem).data('id')];
  //       row.append(response(!!answer))
  //     });

  //     $("tbody").append(row);
  //   });
//
//

  getNameAndRender();

  // When EDIT clicked hide EDIT button
  $("#form-section-table").on('click', '#editBtn', function() {
    $("#attendee-input")
      .closest('.display-table-row')
      .css('display', '');
      $('#editBtn').css('display', 'none');
  });
            
});

