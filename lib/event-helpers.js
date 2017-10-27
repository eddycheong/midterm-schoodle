"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeEventHelpers(db) {
  return {

    // Create a new user into the database
    createUser: function (newUser) {
    },
    // Create a new event into the database
    createEvent: function (newEvent) {
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
            .where({event_id: eventID,
                    attendee_id: attendeeID});
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
    updateEventAttendeeResponses: function (eventID, attendeeID, responses) {
    }
  };
}
