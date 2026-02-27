const user = require("../models/user-model");



const handleSignUpUser = async (req,res)=>{

    const {name, email , password} = req.body;

    await user.create({
        name,
        email,
        password
    });

    return res.render("/");



};
const handleLoginUser = async (req,res)=>{

    const {email, password} = req.body;

    const found = await user.findOne({email, password});

    if(!found) return res.render("login" , {error : "Invalid Username Or Password"});

    return res.redirect("/")


};


module.exports = {
    handleSignUpUser,
    handleLoginUser,
}