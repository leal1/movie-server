var Movie = require("../models/movie");
var Comment = require("../models/comment");
var middlewareObj = {};

// Check is user is logged in
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You must be logged in first");
	res.redirect("/login");
}

// Checks is user is logged in and posted the MOVIE
middlewareObj.checkMovieOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Movie.findById(req.params.id, function(err, movie){
			if(err){
				req.flash("error", "Couldn't find Movie");
				res.redirect("back");
			}
			else{
				if(movie.author.id.equals(req.user._id)){
					next();
				}
				else{
					req.flash("error", "You are not right user!");
					res.redirect("back");
				}
			}
		});
	}
	else{
		req.flash("error", "You must be logged in first");
		res.redirect("back");
	}
}

// Checks if user is logged in and posted the COMMENT
middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, comment){
			if(err){
				req.flash("error", "Couldn't find Comment");
				res.redirect("back");
			}
			else{
				if(comment.author.id.equals(req.user._id)){
					next();
				}
				else{
					req.flash("error", "You are not the right user!");
					res.redirect("back");
				}
			}
		});
	}
	else{
		req.flash("error", "You must be logged in first");
		res.redirect("back");
	}
}

module.exports = middlewareObj;