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

// shades route
wineRouter.get("/shades", (req, res) => {
    res.render("shades.ejs");
});

// Export router object for use in server.js

module.exports = wineRouter;