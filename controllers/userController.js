const user = require("../models/user-model");
const {setUser} = require("../service/auth");


const handleSignUpUser = async (req,res)=>{

    const {name, email , password} = req.body;

    const alreadyExists = await user.findOne({name,email, password});
    
    if(!alreadyExists){
        await user.create({
        name,
        email,
        password
        });
    }
    
    return res.render("signup" , {error:"User already registered , please login instead !"});

};



const handleLoginUser = async (req,res)=>{

    const {email, password} = req.body;

    const found = await user.findOne({email, password});

    if(!found) return res.render("login" , {error : "Invalid Username Or Password"});

    const token = setUser(found);
    res.cookie("uid" , token);

    return res.redirect("/")

};


module.exports = {
    handleSignUpUser,
    handleLoginUser,
}