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

module.exports = router;