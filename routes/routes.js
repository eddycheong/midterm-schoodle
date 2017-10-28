"use strict";

const express = require('express');
const router  = express.Router();
const eventHelper = require('../lib/event-helpers.js');

const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const shortid     = require('shortid');

const makeHash = shortid.generate() + shortid.generate();

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

  // First, validate if hash is valid, if not, send error
  res.locals.sickness = req.params.hash;
  res.render("share_link_page");
});

// event proposal display page
router.get("/events/:hash", (req, res) => { 
  const eventID = req.params.hash,
        db = eventHelper(knex);

  const eventInformation = [
    db.getEventSummary(eventID),
    db.getEventOrganizer(eventID),
    db.getEventDateOptions(eventID),
    db.getEventAttendees(eventID),
    db.getEventAttendees(eventID)
    .then(attendees => {
      const attendeeResponses = attendees.map(attendee => {
        return db.getEventAttendeeResponses(eventID, attendee.id);
      });

      return Promise.all(attendeeResponses);
    })
  ];

  Promise.all(eventInformation)
    .then(data => {
      res.render("event_proposal_display_page")
    });
});


// // POST FORM

// event proposal form page
router.post("/events", (req, res) => {
  
  const two = req.body.id;
  const one = req.body.name;
  
  const urlHash = makeHash;
  res.json({result: `${urlHash}`});

  // const organizerName = req.body.organizerName.trim();      
  // const email = request.body.email.trim();
  // const proposedEventName = req.body.proposedEventName.trim();
  // const proposedEventDates =  req.body.proposedEventDates;
  // const proposedEventDescription = req.body.proposedEventDescription.trim();

  // if (!organizerName || !email || !proposedEventName || !proposedEventDates || !proposedEventDescription) {
  //   res.status(303);
  // } else {
  //   res.redirect("/events/:hash/share");    
  // }
  // const user_id = request.session.user_id; 
});

// // DATABASE PUT/POST QUERIES


// add a new attendee their responses
router.post("/api/v1/events/:hash/attendees", (req, res) => {
  const eventID = req.params.hash;
  const {attendeeName, attendeeEmail} = req.body;

  // const attendeeEventDatesResponse =  req.body.attendeeEventDatesResponse;


  if (!attendeeName || !attendeeEmail ) {
    console.log("I'm in here!")
    res.sendStatus(400);    
  } else {
    const newUser = {
      name: attendeeName,
      email: attendeeEmail
    };

    eventHelper(knex).createUser(newUser)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(()=> {
      res.sendStatus(500);
    });
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
