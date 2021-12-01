// Require dependencies

const express = require("express");

// Initialize the application

const app = express();

// Configure application settings

// Set up port value

require("dotenv").config();

const PORT = process.env.PORT;

// Mount middleware

// body-parser middleware
app.use(express.urlencoded({ extended: false }));

// Mount routes

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Tell app to listen for requests from client/browser

app.listen(PORT, () => {
    console.log("Express is listening on port " + PORT);
});