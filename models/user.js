// Require dependencies

const mongoose = require("mongoose");

// shortcut variable for mongoose Schema

const Schema = mongoose.Schema;

// Define user Schema

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
}, { timestamps : true });

module.exports = mongoose.model("User", userSchema);
