// Require dependencies, create router/controller object

const usersRouter = require("express").Router();
const User = require("../models/user");
const Wine = require("../models/wine");

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

// List router actions

// render login page
usersRouter.get("/login", (req, res) => {
    res.render("login.ejs", {
        tabTitle: "Login",
        error: "",
    });
});

// log user in
usersRouter.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (error, foundUser) => {
        if(!foundUser) return res.render("login.ejs", {
            error: "Invalid credentials, please try again",
            tabTitle: "Login"
        });
        if(!bcrypt.compareSync(req.body.password, foundUser.password)) {
            return res.render("login.ejs", {
                error: "Invalid credentials, please try again",
                tabTitle: "Login"
            });
        }
        req.session.user = foundUser._id;
        res.redirect("/vino-italiano/users/dashboard");
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

// dashboard route
usersRouter.get("/dashboard", async (req, res) => {
    if(!req.session.user) return res.redirect("/vino-italiano/users/login");
    const user = await User.findById(req.session.user).populate("favorites").exec();
        res.render("dashboard.ejs", {
            user,
            tabTitle: "Dashboard"
        });
});

// add favorited wine to specific user's object
usersRouter.post("/dashboard", (req, res) => {
    if(!req.session.user) return res.redirect("/vino-italiano/users/login");
    User.findById(req.session.user, (error, user) => {
        Wine.find({ varietal: req.body.varietal }, (error, wine) => {
            user.favorites.push(wine[0]._id);
            user.save(function() {
                res.redirect("/vino-italiano/users/dashboard");
            })
        });
    });
});

module.exports = usersRouter;