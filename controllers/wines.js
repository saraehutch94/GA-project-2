// Require dependencies

const express = require("express");
const Wine = require("../models/wine");

// Create router/controller object

const wineRouter = express.Router();

// List router actions

// landing page route
wineRouter.get("/", (req, res) => {
    res.render("landing.ejs");
});

// Export router object for use in server.js

module.exports = wineRouter;