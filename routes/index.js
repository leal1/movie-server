var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

// Home Page (Landing Page)
router.get("/", function(req,res){
	res.render("landing");
});

// AUTH ROUTES

// New Route (Render register form)
router.get("/register", function(req,res){
	res.render("register");
});

// Create Route (Create new User)
router.post("/register", function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		res.redirect("/movies");
	});
});

// New Route (Render login form)
router.get("/login", function(req,res){
	res.render("login");
});

// Create Route (Logins in user)
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/movies",
		failureRedirect: "/login"
	}));

// Logout 
router.get("/logout", function(req,res){
	req.logout();
	res.redirect("/movies");
});

module.exports = router;