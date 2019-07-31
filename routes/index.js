var express = require("express");
var router = express.Router();  //difference
var passport = require("passport");
var User = require("../models/user");
     
     //root route
router.get("/",function(req,res){
    res.render("landing");
});


//=============================
//AUTH ROUTES
//=============================
//reg route
router.get("/register",function(req, res) {
    res.render("register");
});
//handle reg
router.post("/register",function(req, res) {
    var newU = new User({username:req.body.username});
    User.register(newU,req.body.password,function(err,user){
        if(err){
            req.flash("error",err.message);
            //console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome here! "+ user.username);
           res.redirect("/campgrounds"); 
        });
    });
});


//login
router.get("/login",function(req,res){
    res.render("login");
});

//handling login logic
router.post("/login",passport.authenticate("local",
{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
    
}),function(req, res) {
    
});

//log out
router.get("/logout",function(req, res) {
   req.logout();
   req.flash("success","You Have Logged Out!");
   res.redirect("/campgrounds");
});



module.exports = router;