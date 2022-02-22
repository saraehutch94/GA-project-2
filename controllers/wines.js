// Require dependencies

const express = require("express");
const Wine = require("../models/wine");
const wineSeed = require("../models/wineSeed");

// Create router/controller object

const wineRouter = express.Router();

// List router actions

// seed route

wineRouter.get("/seed", (req, res) => {
  // delete all wine data within database
  Wine.deleteMany({}, (error, allWines) => {
    // create new wine data using exported data in wineSeed.js
    Wine.create(wineSeed, (error, data) => {
      // redirect to homepage
      res.redirect("/vino-italiano");
    });
  });
});

// search route
wineRouter.get("/search", async (req, res) => {
  // grab query term and place into variable
  let term = req.query.term;
  // if there is a search query present
  if (term) {
    // find the searched wine in the wine database
    const results = await Wine.find({ varietal: { $regex: term } });
    // send results of search in json format
    res.json({ results });
    // if there is no search query present
  } else {
    // render search page again
    res.render("search.ejs", { tabTitle: "Search" });
  }
});

// landing page route
wineRouter.get("/", (req, res) => {
  res.render("landing.ejs", { tabTitle: "Home" });
});

// shades route
wineRouter.get("/shades", (req, res) => {
  res.render("shades.ejs", { tabTitle: "Shades" });
});

// red wine (index) route
wineRouter.get("/redIndex", (req, res) => {
  // find all wines with shade property of red
  Wine.find({ shade: "red" }, (error, allReds) => {
    // render all reds to template
    res.render("redIndex.ejs", {
      allReds,
      tabTitle: "Vino Rosso",
    });
  });
});

// white wine (index) route
wineRouter.get("/whiteIndex", (req, res) => {
  // find all wines with shade property of white
  Wine.find({ shade: "white" }, (error, allWhites) => {
    // render all whites to template
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
  // find wine that was requested to be deleted by it's id property
  // delete the selected wine
  Wine.findByIdAndDelete(req.params.id, (error, deletedWine) => {
    // if shade of deleted wine is red, redirect back to red index
    if (deletedWine.shade === "red") {
      res.redirect("/vino-italiano/redIndex");
      // if shade of deleted wine is white, redirect back to white index
    } else {
      res.redirect("/vino-italiano/whiteIndex");
    }
  });
});

// update route
wineRouter.put("/:id", (req, res) => {
  Wine.findByIdAndUpdate(
    // find the wine by it's id property
    req.params.id,
    // replace with req.body properties
    req.body,
    // save the new version of that wine
    { new: true },
    (error, updatedWine) => {
      // redirect back to show page of that wine
      res.redirect("/vino-italiano/" + req.params.id);
    }
  );
});

// create red wine route
wineRouter.post("/redIndex", (req, res) => {
  // assign shade property to red of added wine to red index
  req.body.shade = "Red";
  // imageError variable for incorrect image entries
  const imageError = "Please enter an image with a .jpg or .png path";

  // if the image property guest submits includes proper/supported image path
  if (["jpg", "png"].some((files) => req.body.img.includes(files))) {
    // create new wine using req.body
    Wine.create(req.body, (error, newRed) => {
      // redirect to red index
      res.redirect("/vino-italiano/redIndex");
    });
    // if the image path submitted is not supported
  } else {
    // re-render add new red page
    res.render("newRed.ejs", {
      // send guest image error
      imageError: imageError,
      tabTitle: "New Vino Rosso",
    });
  }
});

// create white wine route
wineRouter.post("/whiteIndex", (req, res) => {
  // assign shade property to white of added wine to white index
  req.body.shade = "White";
  // imageError variable for incorrect image entries
  const imageError = "Please enter an image with a .jpg or .png path";

  // if the image property guest submits includes proper/supported image path
  if (["jpg", "png"].some((files) => req.body.img.includes(files))) {
    // create new wine using req.body
    Wine.create(req.body, (error, newWhite) => {
      // redirect to white index
      res.redirect("/vino-italiano/whiteIndex");
    });
    // if the image path submitted is not supported
  } else {
    // re-render add new white page
    res.render("newWhite.ejs", {
      // send guest image error
      imageError: imageError,
      tabTitle: "New Vino Bianco",
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
    // uppercase the found wine for the tab title
    const foundWineTitle =
      foundWine.varietal.charAt(0).toUpperCase() + foundWine.varietal.slice(1);
    res.render("show.ejs", {
      foundWine,
      tabTitle: foundWineTitle,
    });
  });
});

// Export router object for use in server.js

module.exports = wineRouter;
