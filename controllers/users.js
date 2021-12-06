// Require dependencies, create router/controller object

const usersRouter = require("express").Router();
const User = require("../models/user");

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

// List router actions

// render login page
usersRouter.get("/login", (req, res) => {
    res.render("login.ejs", {
        tabTitle: "Login"
    });
});

// render signup page
usersRouter.get("/signup", (req, res) => {
    res.render("signup.ejs", {
        tabTitle: "Signup"
    });
});

// sign user up
usersRouter.post("/signup", (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_ROUNDS));
    res.send(hash);
});

// logout route
usersRouter.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/vino-italiano");
    });
});

module.exports = usersRouter;