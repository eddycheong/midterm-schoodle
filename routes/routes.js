"use strict";

const express = require('express');
const router  = express.Router();

// // DISPLAY PAGES

// home page
router.get("/", (req, res) => {
  res.render("index");
});

// event proposal form page
router.get("/create", (req, res) => {
  
  res.render("event_proposal_form_page");
});

// event link share page
router.get("/events/:hash/share", (req, res) => {
  res.render("share_link_page");
});

// event proposal display page
router.get("/events/:hash", (req, res) => {
  res.render("event_proposal_display_page");
});

// // POST FORM

// event proposal form page
router.post("/events", (req, res) => {
  const organizerName = request.body.organizerName.trim();      
  const email = request.body.email.trim();
  const proposedEventName = request.body.proposedEventName.trim();
  const proposedEventDates =  request.body.proposedEventDates.trim();
  const proposedEventDescription = request.body.proposedEventDescription.trim();
  // const user_id = request.session.user_id; 

  res.redirect("/events/:hash/share");
});

// // DATABASE PUT/POST QUERIES

// add new attendee
router.post("api/v1/events/:hash/attendees", (req, res) => {
  const attendeeName = request.body.attendeeName.trim();      
  const attendeeEmail = request.body.attendeeEmail.trim();
  const attendeeEventDatesResponse =  request.body.attendeeEventDatesResponse.trim();
    //conditional in case fields missing: ajax

});

// alter current session attendee
router.put("api/v1/events/:hash/attendees/:id", (req, res) => {
  const attendeeName = request.body.attendeeName.trim();      
  const attendeeEmail = request.body.attendeeEmail.trim();
  const attendeeEventDatesResponse =  request.body.attendeeEventDatesResponse.trim();
  
  //conditional in case only one thing changes: ajax
});


module.exports = router;
