var express = require("express");
var router = express.Router();  //difference
var Campground = require("../models/campground");
var middleware = require("../midware");
router.get("/", function(req, res){
    
    
    Campground.find({},function(err,allcg){
        
        
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds: allcg,currentUser:req.user});
        }
    });
        
});

router.post("/",middleware.isLoggedIn,function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    
    var author={
        id:req.user._id,
        username:req.user.username
    };
    var newCampground = {name:name, image:image,description:desc,author:author};
    //Create new and save
    Campground.create(newCampground,function(err,ncr){
       if(err){
           console.log(err);
       } else{
           res.redirect("/campgrounds");
       }
    });
    
});

router.get("/new",middleware.isLoggedIn,function(req, res) {
   res.render("campgrounds/new"); 
});

//:id :name Show!
router.get("/:id",function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,fucg){
       if(err){
           console.log(err);
       } else{
           res.render("campgrounds/show",{campground: fucg}); 
       }
    });
   
});


//Edit
router.get("/:id/edit",middleware.checkCGownership,function(req, res) {
    Campground.findById(req.params.id,function(err,foundCg){
        res.render("campgrounds/edit",{campground:foundCg});
    
    
    //not - redirect
    });
});


//Update
router.put("/:id",function(req,res){
    //find and update
    
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updateCg){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
    //redirect
});


//Delete!!
router.delete("/:id",middleware.checkCGownership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});

//middle





module.exports = router;
