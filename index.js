const express = require("express");
const app = express();
const port = process.env.PORT || 3000;


const mongoConnection = require("./config/mognoose-connections.js");
const url = require("./models/url-model.js");

const cookieParser = require("cookie-parser");
const urlRoute = require("./routes/urlRouter.js");
const staticRouter = require("./routes/staticRouter.js");
const userRouter = require("./routes/userRouter.js");
const {checkForAuthentication , restrictTo} = require("./middlewares/auth.js");


//Make mongo connection

mongoConnection("mongodb://127.0.0.1:27017/urlshortener").then(()=>{
    console.log("MongoDB Connected...");
})

app.set('view engine', 'ejs');

//use inbuilt middlewares in express framework to parse request body data...
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication);

app.get("/frontend" , async (req,res)=>{
        
    const allUrls = await url.find({});

    return res.render("home" , {allUrls});
})


// Routes
app.use("/url" , restrictTo(["NORMAL"]),urlRoute);
app.use("/" , staticRouter);
app.use("/user" , userRouter);


app.listen(port , ()=>{
    console.log(`Server stared at http://127.0.0.1:${port}`);
})