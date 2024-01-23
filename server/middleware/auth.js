

let  jwt = require("jsonwebtoken");

let verifyUserToken = async (req,res,next) => {

    let getToken = req.headers.authorization;

    if (!getToken) {
        return res.status(401).send("Access Denied!");
    }

    try {
        let verifyToken = await jwt.verify(getToken,"skey");
    
        if (!verifyToken) {
            return res.status(401).send("Unauthorized request Invalid Token!");
        }
        next();
    } catch (e) {
        console.log(e);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = { verifyUserToken }