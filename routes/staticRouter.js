const express = require("express");
const { restrictTo} = require("../middlewares/auth");

const router = express.Router();


router.get("/" , restrictTo("NORMAL"),(req,res)=>{

    res.render("home", {
    shortUrl: null,
    requestHost: req.headers.host,
    id:null
    });

});

router.get("/signup" , (req,res)=>{
    res.render("signup" , {error:null});
})

router.get("/login" , (req,res)=>{
    res.render("login" , {error:null});
})


module.exports = router;