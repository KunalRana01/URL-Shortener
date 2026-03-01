const {getUser} = require("../service/auth");

const restrictToLoggedInUserOnly = async (req,res,next)=>{

    const userId = req.cookies.uid;
     
    if(!userId) return res.redirect("/login");

    const user = getUser(userId);
    
    if(!user) return res.redirect("/login");
        
    req.user = user;

    next();

}

const checkAuth = async (req,res,next)=>{
    
    const token = req.headers?.authorization?.split(" ")[1];
    
    if(!token) return res.redirect("/login");

    const user = getUser(token);
    
    if(!user) return res.redirect("/login");

    req.user = user;

    next();
    
};

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth
}