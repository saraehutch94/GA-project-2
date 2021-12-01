// Require dependencies

const express = require("express");
const Wine = require("../models/wine");

// Create router/controller object

const wineRouter = express.Router();

// List router actions

wineRouter.get("/vino-italiano", (req, res) => {
    res.send("Hello World");
});
