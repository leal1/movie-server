var express = require("express");
var router = express.Router();
var Movie = require("../models/movie");
var Comment = require("../models/comment");

// Index Route (Shows all Movies)
router.get("/", function(req,res){
	Movie.find({}, function(err, movies){
		if(err){
			console.log(err);
		}
		else{
			res.render("movies/index", {movies:movies});
		}
	});
});

// New Route (Shows New Movie Form)
router.get("/new", function(req,res){
	res.render("movies/new");
});

// Create Route (Create a new movie listing and redirect)
router.post("/", function(req,res){
	var title 		= req.body.title;
	var image 		= req.body.image;
	var description = req.body.description;
	var newMovie = {title: title, image: image, description: description};
	// Create a new Movie and save it to DB
	Movie.create( newMovie, function(err, movie){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/movies");
		}
	});
});
// Show Route (Shows one Movie)
router.get("/:id", function(req,res){
	Movie.findById(req.params.id).populate("comments").exec(function(err,movie){
		if(err)
		{
			console.log(err);
		}
		else{
			res.render("movies/show", {movie:movie});
		}
	});
});

// Edit Route (Shows Edit Form)
router.get("/:id/edit", function(req,res){
	Movie.findById(req.params.id, function(err, movie){
		if(err){
			console.log(err);
		}
		else{
			res.render("movies/edit", {movie: movie});
		}
	});
});

// Update Route (Update Movie and redirect to Index Route)
router.put("/:id", function(req,res){
	Movie.findByIdAndUpdate(req.params.id, req.body.movie, function(err, movie){
		if(err){
			res.redirect("/movies");
		}
		else{
			res.redirect("/movies/" + req.params.id);
		}
	});
});

// Destroy Route (Delete a Movie and then redirect)
router.delete("/:id", function(req,res){
	Movie.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/movies");
		}
		else{
			res.redirect("/movies");
		}
	});
});

module.exports = router;