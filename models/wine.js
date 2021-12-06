// Require dependencies

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create mongoose Schema

const wineSchema = new Schema(
    {
        varietal: {type: String, required: true, lowercase: true},
        region: {type: String, lowercase: true},
        shade: {type: String, required: true, lowercase: true},
        description: {type: String, required: true},
        img: String,
    }, { timestamps: true },
);

// Create model from Schema and export

module.exports = mongoose.model("Wine", wineSchema);