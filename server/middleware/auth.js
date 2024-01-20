

let  jwt = require("jsonwebtoken");

let verifyUserToken = async (req,res,next) => {

    let getToken = req.headers.authorization;

    if (!getToken) {
        return res.status(401).send("Access Denied!");
    }

    try {
        let verifyToken = await jwt.verify(getToken,"skey");
        console.log("Decoded Token:", verifyToken);
        if (!verifyToken) {
            return res.status(401).send("Unauthorized request Invalid Token!");
        }else{
            console.log("Valid Token");
        }
        
        console.log("I came here in Middleware");
        next();
    } catch (e) {
        console.log(e);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = { verifyUserToken }