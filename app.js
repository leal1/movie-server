var express 	= require("express"),
bodyParser 		= require("body-parser"),
mongoose 		= require("mongoose"),
Movie 			= require("./models/movie"),
Comment 		= require("./models/comment"),
methodOverride  = require("method-override"),
passport		= require("passport"),
LocalStrategy   = require("passport-local"),
User 			= require("./models/user"),
flash 			= require("connect-flash"),

app 			= express();

// REQUIRING ROUTES

var movieRoutes = require("./routes/movies");
var indexRoutes = require("./routes/index");
var commentRoutes = require("./routes/comments");


// APP CONFIG
mongoose.connect("mongodb://localhost/movie_server", {useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIG
app.use(require("express-session")({
	secret: "dslfajsefE12421lLSFJSEF",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Movie.create({
// 	title:"Get Out",
// 	image:"https://movies.universalpictures.com/media/get-out-main-one-sheet-58753d5968ead-1.png",
// 	description: "Exellent Movie! Would definitely watch again and again and again and again and again \
// 	Wow im so thrilled I saw this movie"
// }, function(err, movie){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		Comment.create({
// 			text: "Nice",
// 			author: "Me"
// 		}, function(err, comment){
// 			if(err){
// 				console.log(err);
// 			}
// 			else{
// 				movie.comments.push(comment);
// 				movie.save();
// 				console.log("New Comment");
// 				console.log("Created new Movie!");
// 				console.log(movie);
// 			}

// 		});

// 	}
// });
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/movies", movieRoutes);
app.use("/", indexRoutes);
app.use("/movies/:id/comments", commentRoutes);





app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Movie Server has started");
});