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
    // Get event summary information
    getEventSummary: function (eventID) {
    },
    // Get all the attendees for a specific event
    getEventAttendees: function (eventID) {
    },
    // Get all responses for a specific attendee of an event
    getEventAttendeeResponses: function (eventID, attendeeID) {
    },
    // Get all the event date options for a specific event
    getEventDateOptions: function (eventID) {
    },
    // Get all information of the organizer for an event
    getEventOrganizer: function (eventID) {
    },
    // Update the attendee's responses for a specific event
    updateEventAttendeeResponses: function (eventID, attendeeID, responses) {
    }
  };
}
