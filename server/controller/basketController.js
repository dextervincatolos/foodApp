let basketModel = require('../model/basketModel');
let userModel = require('../model/userModel');


let addtobasket = async (req, res) => {
    try {
        
        // Assuming productId is obtained from the request body
        const productId = req.body._items;
        const userId = req.body._user;

        // Create or update the basket for the user
        let basket = await basketModel.findOne({ _user: userId });

        if (!basket) {
            // If the basket doesn't exist for the user, create a new one
           let newbasket = new basketModel({
                _user: userId,
                _items: [productId]
                
            });
            await newbasket.save();
        } else {
            // If the basket exists, add the product to the items list
            basket._items.push(productId);
            await basket.save();
        }

        res.status(200).json({ message: "Item added to basket successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
};


let findbasket = (req,res)=>{

    const userId = req.query.uid//req.user._id; // for now static

    // if(req.query.id){
       // const _id = req.query.id;
       basketModel.find({ _user: userId }).then(data=>{

            if(!data){
                res.status(404).send({message: "Product with ID: " + userId + " doesn't exist."})
            }else{
                res.send(data)
            }
         }).catch(err=>{
            res.status(500).send({message:"Error retrieving product with ID "+ userId})
         })
    
}


module.exports = { addtobasket,findbasket };


