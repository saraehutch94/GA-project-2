// Require dependencies

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create mongoose Schema

const wineSchema = new Schema(
    {
        varietal: String,
        region: String,
        description: String
    }, { timestamps: true },
);
