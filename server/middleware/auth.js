let  jwt = require("jsonwebtoken");

let verifyUserToken = async (req,res,next) => {

    let getToken = req.headers.authorization;

    if (!getToken) {
        return res.send("Access Denied!");
    }

    try {
        let verifyToken = await jwt.verify(getToken,"skey");

        if (!verifyToken) {
            res.send("Unauthorized request Invalid Token!");
        }else{
            console.log("Valid Token");
        }
        
        console.log("I came here in Middleware");
        next();
    } catch (e) {
        console.log(e);
        res.send(e);
    }
}

module.exports = { verifyUserToken }