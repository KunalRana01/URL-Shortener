const {getUser} = require("../service/auth");

const checkForAuthentication = (req,res,next)=>{

    const authHeaderValue = req.header["authorization"];

    if(!authHeaderValue || !authHeaderValue.startsWith("Bearer")){
        return next();
    }
    
    const token = authHeaderValue.split("Bearer")[1];
    const user = getUser(token);

    if(!user) return res.redirect("/login");

    req.user = user;
    return next();
};

//Implementing authorisation logic....
function restrictTo(roles=[]){
    return function (req,res,next){
        if(!req.user) return res.redirect("/login");

        if(!roles.includes(req.user.role)) return res.end(("Unauthorized"));

        return next();

    }
}


// const restrictToLoggedInUserOnly = async (req,res,next)=>{

//     const userId = req.cookies.uid;
     
//     if(!userId) return res.redirect("/login");

//     const user = getUser(userId);
    
//     if(!user) return res.redirect("/login");
        
//     req.user = user;

//     next();

// }

// const checkAuth = async (req,res,next)=>{
    
//     const token = req.headers?.authorization?.split(" ")[1];
    
//     if(!token) return res.redirect("/login");

//     const user = getUser(token);
    
//     if(!user) return res.redirect("/login");

//     req.user = user;

//     next();
    
// };

module.exports = {
    // restrictToLoggedInUserOnly,
    // checkAuth,
    checkForAuthentication,
    restrictTo
}