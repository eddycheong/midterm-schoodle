"use strict";

const express = require('express');
const router  = express.Router();
const eventHelpers = require('../lib/event-helpers.js');

const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

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
router.get("/events/:hash/share", (req, res) => { //:hash 
  res.render("share_link_page");
});

// event proposal display page
router.get("/events/:hash", (req, res) => { 
res.render("event_proposal_display_page")
});


// // POST FORM

// event proposal form page
router.post("/events", (req, res) => {
  const organizerName = request.body.organizerName.trim();      
  const email = request.body.email.trim();
  const proposedEventName = request.body.proposedEventName.trim();
  const proposedEventDates =  request.body.proposedEventDates;
  const proposedEventDescription = request.body.proposedEventDescription.trim();

  if (!organizerName || !email || !proposedEventName || !proposedEventDates || !proposedEventDescription) {
    res.status(303);
  } else {
    res.redirect("/events/:hash/share");    
  }
  // const user_id = request.session.user_id; 
});

// // DATABASE PUT/POST QUERIES

// add new attendee
router.post("api/v1/events/:hash/attendees", (req, res) => {
  const attendeeName = request.body.attendeeName.trim();      
  const attendeeEmail = request.body.attendeeEmail.trim();
  const attendeeEventDatesResponse =  request.body.attendeeEventDatesResponse;

  if (!attendeeName || !attendeeEmail ) {
    res.status(303);    
  } else {
    redirect("/api/v1/events/:hash/attendees");
  }
});

// alter current session attendee
router.put("api/v1/events/:hash/attendees/:id", (req, res) => {
  const attendeeName = request.body.attendeeName.trim();      
  const attendeeEventDatesResponse =  request.body.attendeeEventDatesResponse;
  
  if (!attendeeEventDatesResponse) {
     attendeeEventDatesResponse = false;  
  }
});


module.exports = router;
