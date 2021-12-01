// Require dependencies

const express = require("express");
const Wine = require("../models/wine");
const redWineSeed = require("../models/redWineSeed");
const whiteWineSeed = require("../models/whiteWineSeed");

// Create router/controller object

const wineRouter = express.Router();

// List router actions

// seed routes

// red wine seed route
wineRouter.get("/redWineIndex/seed", (req, res) => {
    Wine.deleteMany({}, (error, allRedWines) => {
        Wine.create(redWineSeed, (error, data) => {
            res.send("Hello, red wine seeded?");
        });
    });
});

// white wine seed route
wineRouter.get("/whiteWineIndex/seed", (req, res) => {
    Wine.deleteMany({}, (error, allWhiteWines) => {
        Wine.create(whiteWineSeed, (error, data) => {
            res.send("Hello, white wine seeded?");
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
wineRouter.get("/redWineIndex", (req, res) => {
    
});

// Export router object for use in server.js

module.exports = wineRouter;