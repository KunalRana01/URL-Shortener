const { nanoid } = require('nanoid');
const url = require("../models/url-model.js");


const handleGenerateNewShortUrl = async (req,res)=>{
    
    const bodyObj = req.body;

    if(!bodyObj.fullUrl) return res.status(400).json({error:"URL is required..."});

    const shortID = nanoid(8);

    await url.create({
        shortId :shortID,
        redirectURL : bodyObj.fullUrl,
        visitHistory :[]
    })

    return res.render("home" ,{id:shortID});
};

const handleGetRedirectUrl = async (req,res)=>{
    const shortUrl = req.params.shortUrl;

    try{
        const entry =  await url.findOneAndUpdate({
            shortId : shortUrl
        } , {$push :{
            visitHistory:{
                timestamp:Date.now()
            }
        }});

        
        if(!entry) return res.status(404).send("Short URL not found , please try with another shortid....");

        return res.redirect(entry.redirectURL);

    }catch(err){
        return res.send(err);
    }
    
};


const handleAnalyticsUrl = async (req,res)=>{
    const shortId = req.params.id;

    const result = await url.findOne({shortId : shortId});

    if(!result) return res.status(404).send("Short id not found , please try with another short id....");

    return res.json({totalClicks : result.visitHistory.length , analytics : result.visitHistory});

}


module.exports = {
    handleGenerateNewShortUrl,
    handleGetRedirectUrl,
    handleAnalyticsUrl
}