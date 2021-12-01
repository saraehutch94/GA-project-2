// Require dependencies

const express = require("express");
const Wine = require("../models/wine");
const wineSeed = require("../models/wineSeed");

// Create router/controller object

const wineRouter = express.Router();

// List router actions

// seed route

wineRouter.get("/seed", (req, res) => {
    Wine.deleteMany({}, (error, allWines) => {
        Wine.create(wineSeed, (error, data) => {
            res.redirect("/vino-italiano");
        });
    });
});

// landing page route
wineRouter.get("/", (req, res) => {
    res.render("landing.ejs");
});

// shades route
wineRouter.get("/shades", (req, res) => {
    res.render("shades.ejs");
});

// red wine (index) route
wineRouter.get("/redIndex", (req, res) => {
    Wine.find({shade: "Red"}, (error, allReds) => {
        res.render("redIndex.ejs", {allReds});
    });
});

// white wine (index) route
wineRouter.get("/whiteIndex", (req, res) => {
    Wine.find({shade: "White"}, (error, allWhites) => {
        res.render("whiteIndex.ejs", {allWhites});
    });
});

// Export router object for use in server.js

module.exports = wineRouter;