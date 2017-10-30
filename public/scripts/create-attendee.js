$(() => {

  let editFlag = false;
  let currentUserID;
  let currentUserOnPage;

  function buildAttendeeResponses(array) {
    return {
      attendeeName: array[0],
      attendeeEmail: array[1],
      responses: array.slice(2, array.length)
    };
  };

  function unhideInput() {
      // Unhides Input
    $("#form-section-table").on('click', '#editBtn', function() {
      $("#attendee-input")
        .closest('.display-table-row')
        .css('display', '');
        $('#editBtn').css('display', 'none');
        $("tr").last().css( "display", "none" );
    });
  }
  

  function getNameAndRender(form) {

    const routeHash = form.attr("data-hash");
    const route = `/api/v1/events/${routeHash}/attendees`;
    const newAttendee = form;

    $.ajax({
      method: 'POST',
      url: route,
      data: buildAttendeeResponses(newAttendee.serializeArray())
    })
      .done((attendee) => {
        
        // grab attendee currently on page
        currentUserID = attendee.id; // 

        // Make Edit Button
        $('<input id="editBtn" class="btn btn-primary btn-sm"></input>').attr({'type': 'button'}).val("Edit Your Entry").click(function(){
        }).appendTo($('th.proposal-display-table-headers'));

        // Hide Submit Row
        $('#user-submit-name, #user-submit-email')
          .css('display', 'none');

        // Change button text & position
        $('#attendee-form-submit-button')
          .text('Submit Edit')
          .css('float', 'right');

        // hide User Input row
        $("#attendee-input")
          .closest('.display-table-row')
          .css('display', 'none');

        // // Add New Text
        // $('#attendee-input').append(`Edit Your Response ${currentUserOnPage}`);   // Add text to next to Edit Submit Btn


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

        // grab current page user submitted name 
        const currentUser = attendeeFullResponses[0].value;
        currentUserOnPage = currentUser;
        console.log(currentUserOnPage);

        // Add New Text
        $('#attendee-input').append(`${currentUserOnPage}`);   // Add text to next to Edit Submit Btn
        

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

        const currentUserRow = $("<tr>").addClass("display-table-row")
          .append(name);

        const eventRows = $('thead > tr').children();
        const eventDateOptions = eventRows.slice(1, eventRows.length);

        eventDateOptions.each(function(index, elem) {
          const answer = yesDateOptions[$(elem).data('id')];
          currentUserRow.append(response(!!answer));
        });

        $("tbody").append(currentUserRow); // add current user attendee to row



        editFlag = true;  // change to edit user flag
    });
  }

  function getNameAndEditUser(form) {

    const routeHash = form.attr("data-hash");
    const route = `/api/v1/events/${routeHash}/attendees/${currentUserID}`;
    const newAttendee  = form;

    $.ajax({
      method: 'PUT',
      url: route,
      data: buildAttendeeResponses(newAttendee .serializeArray())
    })
      .done(() => {
        console.log('PUT call Successful!')

        // hide submit edit row
        $("#attendee-input")
          .closest('.display-table-row')
          .css('display', 'none');
        $('#editBtn').css('display', '');
        $("tr").last().css( "display", "none" );

        
        // // Add new Row With Attendee
        const newRow = {};

        // add attendee responses per date
        const attendeeFullResponses = newAttendee .serializeArray();
        const attendeeCheckboxAnswers = attendeeFullResponses.slice(2, attendeeFullResponses.length);

        // // grab current page user submitted name 
        // const currentUser = attendeeFullResponses[0].value;
        // currentUserOnPage = currentUser;
        // console.log(currentUserOnPage);
        
        newAttendee .serializeArray().forEach(elem => {
          if (elem.name === "attendeeName") {
            newRow["attendeeName"] = elem.value;
          }
        });
        
        const name = $("<td>")
          .addClass("proposal-display-table-attendee-name")
          .text(newRow.attendeeName);

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

        const currentUserRow = $("<tr>").addClass("display-table-row")
          .append(name);

        const eventRows = $('thead > tr').children();
        const eventDateOptions = eventRows.slice(1, eventRows.length);

        eventDateOptions.each(function(index, elem) {
          const answer = yesDateOptions[$(elem).data('id')];
          currentUserRow.append(response(!!answer));
        });

        $("tbody").append(currentUserRow); // add current user attendee to row

      });  // end of done
  } // end of function

  $('form').on('submit', function(event) {
    event.preventDefault();

    unhideInput();

    if(editFlag) {
      getNameAndEditUser($(this));  // edit user
    } else {
      getNameAndRender($(this));  // create user
    }

  }); // end edit
}); // end ready

