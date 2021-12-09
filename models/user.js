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
    favorites: [{type: Schema.Types.ObjectId, ref: "Wine"}],
}, { timestamps : true });

module.exports = mongoose.model("User", userSchema);
