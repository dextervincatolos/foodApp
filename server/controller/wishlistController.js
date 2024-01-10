let wishlistModel = require('../model/wishlistModel');
let userModel = require('../model/userModel');

let addWishlist = async (req, res) => {

    try {
        // Retrieve user ID from the authenticated user's session or token
        const userId = '657324fac19a2128d88ccc20'//req.user._id; // for now static
        
        // Assuming productId is obtained from the request body
        const productId = req.body._items;

        // Create or update the wishlist for the user
        let wishlist = await wishlistModel.findOne({ _user: userId });

        if (!wishlist) {
            // If the wishlist doesn't exist for the user, create a new one
           let newwishlist = new wishlistModel({
                _user: userId,
                _items: [productId]
                
            });
            await newwishlist.save();
        } else {
            // If the wishlist exists, add the product to the items list
            wishlist._items.push(productId);
            await wishlist.save();
        }

        res.send("Item added to wishlist successfully");
    } catch (err) {
        res.status(500).send(err);
    }
};

let findwishlist = (req,res)=>{

    const userId = '657324fac19a2128d88ccc20'//req.user._id; // for now static

    // if(req.query.id){
       // const _id = req.query.id;
       wishlistModel.findOne({ _user: userId }).then(data=>{

            if(!data){
                res.status(404).send({message: "Product with ID: " + userId + " doesn't exist."})
            }else{
                res.send(data)
            }
         }).catch(err=>{
            res.status(500).send({message:"Error retrieving product with ID "+ userId})
         })
    
}

module.exports = {addWishlist,findwishlist};