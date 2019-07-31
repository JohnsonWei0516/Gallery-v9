//Middleware!
var middlewareObj = {};
var Campground = require("../models/campground");
var Comment  =require("../models/comment");

middlewareObj.checkCGownership = function(req,res,next){
    if(req.isAuthenticated()){
        //have post?
        Campground.findById(req.params.id,function(err,foundCg){
        if(err){
            req.flash("error","Campground not found");
            res.redirect("back");
        }else{
            
            
            if(foundCg.author.id.equals(req.user._id)){//object != string
                next();
            } else{
                req.flash("error","You don't have permission to do that!");
                res.redirect("back");
            }   
        }
    });
    
    }else{
        req.flash("error","Please Login First!");
        res.redirect("back");   //back previous page
    }
}

middlewareObj.chkcom = function(req,res,next){
            if(req.isAuthenticated()){
        //have post?
        Comment.findById(req.params.comment_id,function(err,foundCom){
        if(err){
            req.flash("error","Comment not found");
            res.redirect("back");
        }else{
            
            
            if(foundCom.author.id.equals(req.user._id)){//object != string
                next();
            } else{
                req.flash("error","You don't have permission to do that!");
                res.redirect("back");
            }   
        }
    });
    
    }else{
        req.flash("error","Please Login First!");
        res.redirect("back");   //back previous page
    }
}

middlewareObj.isLoggedIn =function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please Login First!");
    res.redirect("/login");
};


module.exports = middlewareObj;