const express = require("express");


const router = express.Router();


router.get("/" , (req,res)=>{

    res.render("home", {
    shortUrl: null,
    requestHost: req.headers.host,
    id:null
    });

});

router.get("/signup" , (req,res)=>{
    res.render("signup");
})

router.get("/login" , (req,res)=>{
    res.render("login" , {error:null});
})


module.exports = router;