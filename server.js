"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const shortid     = require('shortid');

// Seperated Routes for each Resource
const routes = require("./routes/routes");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static("public"));

// make hash's URL safe
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');


// Mount all resource routes
app.use("/", routes); //(knex)

// event proposal form page
app.get("/create", (req, res) => {
  res.render("event_proposal_form_page");
});

// event link share page
app.get("/events/share", (req, res) => {  // :hash 
  res.render("share_link_page");
});

// event proposal display page
app.get("/events/6", (req, res) => {

        // res.json(res.locals);
        res.render("event_proposal_display_page");
      });
  
  
    //get attendees 
  


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
