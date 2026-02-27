const mongoose = require("mongoose");

function makeMongoDbConnection(url){
    return mongoose.connect(url);
};


module.exports = makeMongoDbConnection;