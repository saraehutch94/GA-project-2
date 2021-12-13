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
    // find one user in database based on entered email
    User.findOne({ email: req.body.email }, (error, foundUser) => {
        // if there is no found user, re-render login template with error
        if(!foundUser) return res.render("login.ejs", {
            error: "Invalid credentials, please try again",
            tabTitle: "Login"
        });
        // if bcrypt compares the entered password with the current password
        // in the database and there is no match, re-render login template with error
        if(!bcrypt.compareSync(req.body.password, foundUser.password)) {
            return res.render("login.ejs", {
                error: "Invalid credentials, please try again",
                tabTitle: "Login"
            });
        }
        // if above two scenarios aren't the case, log-in the found 
        // user by setting session property user to user's id
        req.session.user = foundUser._id;
        // redirect to dashboard
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
    // generate hash version of password user uses to sign-up
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_ROUNDS));
    // replace entered password with hash version of password
    req.body.password = hash;
    User.create(req.body, (error, user) => {
        // log user in after creating account
        req.session.user = user._id;
        // redirect to dashboard
        res.redirect("/vino-italiano/users/dashboard");
    });
});

// logout route
usersRouter.get("/logout", (req, res) => {
    // destroy current session on logout
    req.session.destroy(() => {
        res.redirect("/vino-italiano");
    });
});

// dashboard route
usersRouter.get("/dashboard", (req, res) => {
    // if there is not is currently a session with a user, redirect them to login
    if(!req.session.user) return res.redirect("/vino-italiano/users/login");
    // otherwise, find current session with user
    // populate their favorites, if any
    User.findById(req.session.user).populate("favorites").exec((error, user) => {
        // render the dashboard page
        res.render("dashboard.ejs", {
            user,
            tabTitle: "Dashboard",
        });
    });
});

// delete favorite route
usersRouter.delete("/dashboard/:id", (req, res) => {
    // find the user by it's id in the session
    User.findById(req.session.user, (error, user) => {
        const favorites = user.favorites;
        // loop over all favorites and find match between
        // favorite's id and req.params.id in url, return
        const foundFavorite = favorites.find((favorite) => {
            return favorite._id == req.params.id
        });
        // find index of found favorite
        let index = favorites.indexOf(foundFavorite);
        // take index and splice only that favorite
        favorites.splice(index, 1)
        // save user after splicing favorite
        user.save(function() {
            // redirect to user's dashboard
            res.redirect("/vino-italiano/users/dashboard");
        });
    });
});

// add favorited wine to specific user's object
usersRouter.post("/dashboard", (req, res) => {
    // if there is currently no session with a user, redirect to login
    if(!req.session.user) return res.redirect("/vino-italiano/users/login");
    // otherwise, find the currently logged-in user by id in the session
    User.findById(req.session.user, (error, user) => {
        // find wine by the varietal within the form submitted
        Wine.find({ varietal: req.body.varietal }, (error, wine) => {
            // take that wine's id property and push it into the user's favorites array
            user.favorites.push(wine[0]._id);
            // save user after pushing new favorite
            user.save(function() {
                // redirect to dashboard to see newly-added favorite
                res.redirect("/vino-italiano/users/dashboard");
            })
        });
    });
});

module.exports = usersRouter;
