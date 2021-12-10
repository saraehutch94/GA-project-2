// Require dependencies

const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const wineController = require("./controllers/wines");
const morgan = require("morgan");
const session = require("express-session");
const userController = require("./controllers/users");

// Initialize the application

const app = express();

// Configure application settings

// Set up port value

require("dotenv").config();

// Database connection

const { PORT, DATABASE_URL, SECRET } = process.env;

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

// morgan middleware
app.use(morgan("dev"));

// session middleware
app.use(session({ 
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
 }));

 // middleware that adds session to req.locals, otherwise sets user to null
 app.use(async function(req, res, next) {
    if(req.session && req.session.user) {
        const user = await require('./models/user').findById(req.session.user)
        res.locals.user = user;
    } else {
        res.locals.user = null;
    }
    next();
});

// comment in server.js

// Mount router middleware
app.use("/vino-italiano", wineController);
app.use("/vino-italiano/users", userController);

// Tell app to listen for requests from client/browser

app.listen(PORT, () => {
    console.log("Express is listening on port " + PORT);
});