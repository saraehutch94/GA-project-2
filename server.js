// Require dependencies

const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

// Initialize the application

const app = express();

// Configure application settings

// Set up port value

require("dotenv").config();

const PORT = process.env.PORT;

// Database connection

const DATABASE_URL = process.env.DATABASE_URL;

// Mount middleware

// body-parser middleware
app.use(express.urlencoded({ extended: false }));

// static/public middleware
app.use(express.static("public"));

// method-override middleware
app.use(methodOverride("_method"));

// Mount routes

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Tell app to listen for requests from client/browser

app.listen(PORT, () => {
    console.log("Express is listening on port " + PORT);
});