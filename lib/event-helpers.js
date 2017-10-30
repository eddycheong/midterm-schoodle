"use strict";

module.exports = function makeEventHelpers(db) {
  return {

    // Create a new user into the database
    createUser: function (newUser) {
      return db('users').insert(newUser).returning('id');
    },

    // Create a new event into the database
    createEvent: function (newEvent) {
      return db('events').insert(newEvent);
    },

    // Create a new event into the database
    createEventDateOptions: function (eventDateOptions) {
      const eventID = eventDateOptions.eventID,
            eventDateOpts = eventDateOptions.dateOptions;

      const eventDateMap = eventDateOpts.map(dateOpt => {
        return db('event_dates').insert({
          date: dateOpt,
          event_id: eventID
        });
      });

      return Promise.all(eventDateMap);
    },

    // Create the responses to an event for a specific user
    createUserResponses: function (attendeeResponses) {
      const attendeeID = attendeeResponses.attendeeID,
        responses = attendeeResponses.responses

      const res = responses.map(eventDates => {
        return {
          event_date_id: eventDates.id,
          attendee_id: attendeeID,
          event_date_response: eventDates.response
        }
      });

      return db('user_event_availability').insert(res);

    },
    
    // Get event summary informatoin
    getEventSummary: function (eventID) {
      return db('events').where('hash_id', eventID);
    },

    // Get all the attendees for a specific event
    getEventAttendees: function (eventID) {
      const eventAttendees = db('user_event_availability')
        .join('event_dates', 'user_event_availability.event_date_id', '=', 'event_dates.id')
        .where('event_id', eventID).select('attendee_id');
      return db('users').whereIn('id', eventAttendees);
    },

    // Get all responses for a specific attendee of an event
    getEventAttendeeResponses: function (eventID, attendeeID) {
      return db('user_event_availability')
        .join('event_dates', 'user_event_availability.event_date_id', '=', 'event_dates.id')
        .where({
          event_id: eventID,
          attendee_id: attendeeID
        });
    },

    // Get all the event date options for a specific event
    getEventDateOptions: function (eventID) {
      return db('event_dates').where('event_id', eventID);
    },

    // Get all information of the organizer for an event
    getEventOrganizer: function (eventID) {
      const organizerID = db('events').select('organizer_id').where('hash_id', eventID);
      return db('users').where('id', organizerID);
    },

    // Update the attendee's responses for a specific event
    updateEventAttendeeResponses: function (attendeeResponses) {
      const attendeeID = attendeeResponses.attendeeID,
        responses = attendeeResponses.responses

      responses.forEach(response => {
        db('user_event_availability')
          .where('attendee_id', attendeeID)
          .where('event_date_id', response.id)
          .update('event_date_response', response.response)
          .then(() => { })
      });
    }
  };
}
