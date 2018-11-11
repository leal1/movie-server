var Movie = require("../models/movie");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = middlewareObj;