const express = require("express");
const router = express.Router();

const {handleSignUpUser , handleLoginUser} = require("../controllers/userController.js");




router.post("/" , handleSignUpUser);
router.post("/login" , handleLoginUser);


module.exports = router;