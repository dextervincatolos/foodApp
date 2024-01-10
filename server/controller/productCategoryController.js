//My controller

let getProductCategory = require('../model/productCategoryModel');

let productCategory = (req,res)=>{

    if(req.query.id){
        const _id = req.query.id;
        getProductCategory.findById(_id).then(data=>{

            if(!data){
                res.status(404).send({message: "Product category with ID: " + _id + " doesn't exist."})
            }else{
                res.send(data)
            }
         }).catch(err=>{
            res.status(500).send({message:"Error retrieving product category with ID "+ _id})
         })
    }else{

        getProductCategory.find().then(data=>{
            res.send(data)
        }).catch(err=>{
            res.status(500).send({
                message:err.message || "Some error occured while executing operation!"
            });
            
        });

    }
    
}

module.exports = {productCategory};