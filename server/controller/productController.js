const { response } = require('express');
var product = require('../model/foodproduct_model');


//----------------------------------------------------------------

exports.new_product = async (req, res) => {

    console.log("Received request body:", req.body); // Log the request body to check if data is being received

    // validate request
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty!"});
        return;
    }

    const _newProduct = new product({
        _product_name: req.body._product_name,
        _product_image: req.body._product_image,
        _category: req.body._category,
        _description: req.body._description,
        _quantity: req.body._quantity,
        _rating: req.body._rating,
        _sold_item: req.body._sold_item
    });

    _newProduct.save().then(data=>{
        //res.redirect('/')
        res.status(201).json(_newProduct);

    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occured while executing operation!"
        });
    });
}
//----------------------------------------------------------------

exports.find_product = (req,res)=>{

    if(req.query.id){
        const _id = req.query.id;
         product.findById(_id).then(data=>{

            if(!data){
                res.status(404).send({message: "Product with ID: " + patientid + " doesn't exist."})
            }else{
                res.send(data)
            }
         }).catch(err=>{
            res.status(500).send({message:"Error retrieving product with ID "+ patientid})
         })
    }else{

        product.find().then(data=>{
            res.send(data)
        }).catch(err=>{
            res.status(500).send({
                message:err.message || "Some error occured while executing operation!"
            });
            
        });

    }
    
}

//----------------------------------------------------------------

exports.update_product = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content cannot be empty!" });
    }

    const _id = req.params.id;

    product.findByIdAndUpdate(_id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({ message: `Cannot Update product with ${_id}. Product not found!` });
        } else {
            res.send(data);
        }
    }).catch(err => {
        res.status(500).send({ message: "Product update unsuccessful!" });
    });
}

//----------------------------------------------------------------

exports.delete_product = (req,res)=>{

    const _id = req.params.id;

    product.findByIdAndDelete(_id).then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Delete product with id ${_id}. Product not found!`})
        }else{
            res.send({message:"Deleted Successfully!"})
        }

    }).catch(err=>{
        res.status(500).send({message:"Could not delete Product with id = "+_id});
    });

}