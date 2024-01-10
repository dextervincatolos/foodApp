let  jwt = require("jsonwebtoken");

let verifyUserToken = (req,res,next) => {

    console.log("I came Here")
    next();
}

module.exports = { verifyUserToken }