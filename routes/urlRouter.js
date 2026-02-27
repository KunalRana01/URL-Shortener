const express = require("express");
const router = express.Router();

const {handleGenerateNewShortUrl , handleGetRedirectUrl ,handleAnalyticsUrl} = require("../controllers/url.js");




router.post("/" , handleGenerateNewShortUrl)


router.get("/:shortUrl" , handleGetRedirectUrl);

router.get("/analytics/:id" , handleAnalyticsUrl);


module.exports = router;