let productModel = require('../model/productModel');

// let newProduct = async (req, res) => {
//     try {
//         let product = req.body;
//         let result = await productModel.insertMany(product);
//         res.send(result);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// };
let newProduct = async (req, res) => {
    try {
        //Extract product data from the request body
        const { _product_name, _category, _price, _rating, _description, _quantity, _sold_item} = req.body;

         // Check if file exists in the request
         if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        //Get the image data and content type
        const {buffer, mimetype} = req.file;

        const newProduct = new productModel({

            _product_name,
            _category,
            _price,
            _rating,
            _description,
            _quantity,
            _sold_item,
            _product_image: {
                data: buffer,
                contentType:mimetype
            }


        });

        //save the new product to the database
        const result = await newProduct.save();

        res.status(201).json(result);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

let findProduct = (req,res)=>{

    if(req.query.id){
        const _id = req.query.id;
        productModel.findById(_id).then(data=>{

            if(!data){
                // res.status(404).send({message: "Product with ID: " + _id + " doesn't exist."})
                res.status(404).send({ message: "Product with ID: " + _id + " doesn't exist." });
            }else{
                //res.send(data)
                res.send({ ...data._doc, _product_image: base64Image });
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


//-----------------------------------------------------------------------------------------------------------------------------
let findProductsByCategory = (req, res) => {
    const categoryId = req.query.categoryId; // Assuming you pass category ID in query params

    if (!categoryId) {
        return res.status(400).send({ message: 'Category ID is required.' });
    }

    productModel.find({ _category: categoryId })
        .then(products => {
            if (!products || products.length === 0) {
                return res.status(404).send({ message: 'No products found for the given category ID.' });
            }
            res.send(products);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products by category."
            });
        });
};

//-----------------------------------------------------------------------------------------------------------------------------


let updateProduct = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content cannot be empty!" });
    }

    const _id = req.params.id;

    productModel.findByIdAndUpdate(_id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({ message: `Cannot Update product with ${_id}. Product not found!` });
        } else {
            res.send(data);
        }
    }).catch(err => {
        res.status(500).send({ message: "Product update unsuccessful!" });
    });
}




let deleteProduct = (req,res)=>{

    const _id = req.params.id;

    productModel.findByIdAndDelete(_id).then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Delete product with id ${_id}. Product not found!`})
        }else{
            res.send({message:"Deleted Successfully!"})
        }

    }).catch(err=>{
        res.status(500).send({message:"Could not delete Product with id = "+_id});
    });

}

module.exports = {newProduct,findProduct,updateProduct,deleteProduct,findProductsByCategory};