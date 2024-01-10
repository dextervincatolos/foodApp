

let userModel = require('../model/userModel');
let bcryptjs = require('bcryptjs');

let registerUser = async (req, res) => {
    let user = req.body;
    try {
        let salt = await bcryptjs.genSalt(10);
        let encryptedpass = await bcryptjs.hash(user._password,salt);
        user._password = encryptedpass;
        let result = await userModel.insertMany(user);
        console.log(user);
        res.send("New user created successfully!");
        	
    } catch (err) {
        res.status(500).send(err);
    }
};
 
let findUser = (req,res)=>{

    if(req.query.id){
        const _id = req.query.id;
        productModel.findById(_id).then(data=>{

            if(!data){
                res.status(404).send({message: "Product with ID: " + _id + " doesn't exist."})
            }else{
                res.send(data)
            }
         }).catch(err=>{
            res.status(500).send({message:"Error retrieving product with ID "+ _id})
         })
    }else{

        productModel.find().then(data=>{
            res.send(data)
        }).catch(err=>{
            res.status(500).send({
                message:err.message || "Some error occured while executing operation!"
            });
            
        });

    }
    
}


// let updateProduct = async (req, res) => {
//     if (!req.body) {
//         return res.status(400).send({ message: "Content cannot be empty!" });
//     }

//     const _id = req.params.id;

//     productModel.findByIdAndUpdate(_id, req.body, { useFindAndModify: false }).then(data => {
//         if (!data) {
//             res.status(404).send({ message: `Cannot Update product with ${_id}. Product not found!` });
//         } else {
//             res.send(data);
//         }
//     }).catch(err => {
//         res.status(500).send({ message: "Product update unsuccessful!" });
//     });
// }




// let deleteProduct = (req,res)=>{

//     const _id = req.params.id;

//     productModel.findByIdAndDelete(_id).then(data=>{
//         if(!data){
//             res.status(404).send({message:`Cannot Delete product with id ${_id}. Product not found!`})
//         }else{
//             res.send({message:"Deleted Successfully!"})
//         }

//     }).catch(err=>{
//         res.status(500).send({message:"Could not delete Product with id = "+_id});
//     });

// }

module.exports = {registerUser,findUser};

