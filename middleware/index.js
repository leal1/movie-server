var Movie = require("../models/movie");
var Comment = require("../models/comment");
var middlewareObj = {};

// Check is user is logged in
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

// Checks is user is logged in and posted the MOVIE
middlewareObj.checkMovieOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Movie.findById(req.params.id, function(err, movie){
			if(err){
				res.redirect("back");
			}
			else{
				if(movie.author.id.equals(req.user._id)){
					next();
				}
				else{
					res.redirect("back");
				}
			}
		});
	}
	else{
		res.redirect("back");
	}
}

// Checks if user is logged in and posted the COMMENT
middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, comment){
			if(err){
				res.redirect("back");
			}
			else{
				if(comment.author.id.equals(req.user._id)){
					next();
				}
				else{
					res.redirect("back");
				}
			}
		});
	}
	else{
		res.redirect("back");
	}
}

module.exports = middlewareObj;