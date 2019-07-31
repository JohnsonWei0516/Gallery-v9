var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");  //V9 changed
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");
// var Comment = require("./models/user");
//var seedDB = require("./seeds");


//requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");



mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true }); //connect
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));  //safer __dirname
app.use(methodOverride("_method"));
//seedDB();  //seed the database
app.use(flash());


app.use(require("express-session")({
    secret:"123",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//send the current User to every ejs
app.use(function(req,res,next){     
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next(); 
});

//use route
app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);

   
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Sexy Server Has Started!");
});