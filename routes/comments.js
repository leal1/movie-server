var express = require("express");
var router = express.Router({mergeParams:true});
var Movie = require("../models/movie");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// New Route (render new comment form)
router.get("/new", middleware.isLoggedIn, function(req,res){
	Movie.findById(req.params.id, function(err, movie){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new", {movie: movie});
		}
	});
	
});

// Create Route (create new comment and redirect)
router.post("/", middleware.isLoggedIn, function(req,res){
	Movie.findById(req.params.id, function(err, movie){
		if(err){
			console.log(err);
		}
		else{
			Comment.create(req.body.comment , function(err, comment){
				if(err){
					console.log(err);
				}
				else{
					comment.save();
					movie.comments.push(comment);
					movie.save();
					res.redirect("/movies/" + req.params.id);
				}
			})
		}
	});
});

// Edit Route (render edit comment form)
router.get("/:comment_id/edit", function(req,res){
	Comment.findById(req.params.comment_id, function(err, comment){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/edit", {movie_id: req.params.id, comment: comment});
		}
	})
});

// Update Route (update comment and redirect)
router.put("/:comment_id", function(req,res){
	res.send("PUTTED");
});

module.exports = router;