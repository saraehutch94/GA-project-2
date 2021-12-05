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
    res.render("landing.ejs", {tabTitle: "Home"});
});

// shades route
wineRouter.get("/shades", (req, res) => {
    res.render("shades.ejs", {tabTitle: "Shades"});
});

// red wine (index) route
wineRouter.get("/redIndex", (req, res) => {
    Wine.find({shade: "Red"}, (error, allReds) => {
        res.render("redIndex.ejs", {
            allReds,
            tabTitle: "Vino Rosso",
        });
    });
});

// white wine (index) route
wineRouter.get("/whiteIndex", (req, res) => {
    Wine.find({shade: "White"}, (error, allWhites) => {
        res.render("whiteIndex.ejs", {
            allWhites,
            tabTitle: "Vino Bianco",
        });
    });
});

// new red route
wineRouter.get("/redIndex/new", (req, res) => {
    res.render("newRed.ejs", {
        tabTitle: "New Vino Rosso",
        imageError: "",
    });
});

// new white route
wineRouter.get("/whiteIndex/new", (req, res) => {
    res.render("newWhite.ejs", {
        tabTitle: "New Vino Bianco",
        imageError: "",
    });
});

// delete route
wineRouter.delete("/:id", (req, res) => {
    Wine.findByIdAndDelete(req.params.id, (error, deletedWine) => {
        if (deletedWine.shade === "Red") {
            res.redirect("/vino-italiano/redIndex");
        } else {
            res.redirect("/vino-italiano/whiteIndex");
        }
    });
});

// update route
wineRouter.put("/:id", (req, res) => {
    Wine.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, updatedWine) => {
            res.redirect("/vino-italiano/" + req.params.id);
        }
    );
});

// create red route
wineRouter.post("/redIndex", (req, res) => {
    req.body.shade = "Red";
    const imageError = "Please enter an image with a .jpg or .png path"

    if (req.body.img.includes("jpg", "png")) {
        Wine.create(req.body, (error, newRed) => {
            res.redirect("/vino-italiano/redIndex");
        });
    } else {
        res.render("newRed.ejs", {
            imageError: imageError,
            tabTitle: "New Vino Rosso"
        });
    }
});

// create white route
wineRouter.post("/whiteIndex", (req, res) => {
    req.body.shade = "White";
    const imageError = "Please enter an image with a .jpg or .png path"
    
    if (req.body.img.includes("jpg", "png")) {
        Wine.create(req.body, (error, newWhite) => {
            res.redirect("/vino-italiano/whiteIndex");
        });
    } else {
        res.render("newWhite.ejs", {
            imageError: imageError,
            tabTitle: "New Vino Bianco"
        });
    }
});

// edit route
wineRouter.get("/:id/edit", (req, res) => {
    Wine.findById(req.params.id, (error, foundWine) => {
        res.render("edit.ejs", {
            foundWine,
            tabTitle: "Edit Vino",
        });
    });
});

// show route
wineRouter.get("/:id", (req, res) => {
    Wine.findById(req.params.id, (error, foundWine) => {
        res.render("show.ejs", {
            foundWine,
            tabTitle: foundWine.varietal,
        });
    });
});


// Export router object for use in server.js

module.exports = wineRouter;