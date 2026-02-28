const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

function setUser(user){
    return jwt.sign({
        id:user._id,
        email:user.email
    } , process.env.JWT_SECRET);
};

function getUser(token){
    if(!token) return null;

    try{
        return jwt.verify(token , process.env.JWT_SECRET);
    }catch(err){
        return null;
    }

};

module.exports = {
    setUser,
    getUser
}