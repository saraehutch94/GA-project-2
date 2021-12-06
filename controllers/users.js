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

// log user in
usersRouter.post("/login", (req, res) => {
    
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
    req.body.password = hash;
    User.create(req.body, (error, user) => {
        req.session.user = user._id;
        res.redirect("/vino-italiano/users/dashboard");
    });
});

// logout route
usersRouter.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/vino-italiano");
    });
});

usersRouter.get("/dashboard", (req, res) => {
    if(!req.session.user) return res.redirect("/vino-italiano/users/login");
    User.findById(req.session.user, (error, user) => {
        res.render("dashboard.ejs", {
            user,
            tabTitle: "Dashboard"
        });
    });
});

module.exports = usersRouter;