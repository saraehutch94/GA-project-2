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

// new red route
wineRouter.get("/redIndex/new", (req, res) => {
    res.render("newRed.ejs");
});

// new white route
wineRouter.get("/whiteIndex/new", (req, res) => {
    res.render("newWhite.ejs");
});

// delete route


// update route


// create red route
wineRouter.post("/redIndex", (req, res) => {
    req.body.shade = "Red";

    Wine.create(req.body, (error, newRed) => {
        res.redirect("/vino-italiano/redIndex");
    });
});

// create white route
wineRouter.post("/whiteIndex", (req, res) => {
    req.body.shade = "White";
    
    Wine.create(req.body, (error, newWhite) => {
        res.redirect("/vino-italiano/whiteIndex");
    });
});


// edit route


// show route
wineRouter.get("/:id", (req, res) => {
    Wine.findById(req.params.id, (error, foundWine) => {
        res.render("show.ejs", {foundWine});
    });
});


// Export router object for use in server.js

module.exports = wineRouter;