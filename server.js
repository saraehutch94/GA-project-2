// Require dependencies

const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const wineController = require("./controllers/wines");

// Initialize the application

const app = express();

// Configure application settings

// Set up port value

require("dotenv").config();

const PORT = process.env.PORT;

// Database connection

const DATABASE_URL = process.env.DATABASE_URL;

// connect mongoose to database/mongoDB
mongoose.connect(DATABASE_URL);

// variable representing mongoose connection object
const db = mongoose.connection;

db.on("error", (error) => {
    console.log("Error: " + error.message);
});

db.on("connected", () => {
    console.log("mongoDB is connected");
});

db.on("disconnected", () => {
    console.log("mongoDB is disconnected");
});

// Mount middleware

// body-parser middleware
app.use(express.urlencoded({ extended: false }));

// static/public middleware
app.use(express.static("public"));

// method-override middleware
app.use(methodOverride("_method"));

// Mount routes

// Tell app to listen for requests from client/browser

app.listen(PORT, () => {
    console.log("Express is listening on port " + PORT);
});