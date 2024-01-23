

let userModel = require('../model/userModel');
let bcryptjs = require('bcryptjs');
let jwt = require('jsonwebtoken');

let registerUser = async (req, res) => {
    let user = req.body;
    try {
        let salt = await bcryptjs.genSalt(10);
        let encryptedpass = await bcryptjs.hash(user._password,salt);
        user._password = encryptedpass;
        let result = await userModel.insertMany(user);
        res.json({ message: "New user created successfully!" });
        	
    } catch (err) {
        res.status(500).send(err);
    }
};
 
let loginUser = async (req,res)=>{

     try{
        let user = req.body;
        let result = await userModel.findOne({_email:user._email});

        if(result!=null){

            let passwordVerify = await bcryptjs.compare(user._password,result._password);

            if(passwordVerify){
                let payload = {"email":user._email,"fname":result._first_name,"lname":result._last_name,"id":result._id, "typeOfuser":result._accesstype}
                let token = jwt.sign(payload,"skey");
                res.send({"msg":"Login Successful", "token":token, "payload":payload});
            }else{
                res.send("Password Invalid");
            }

        }else{
            res.send("Invalid Email");
        }

     }catch(e){
        console.log(e);
        res.status(500).send("Internal Server Error");
     }
    
}

module.exports = {registerUser,loginUser};

