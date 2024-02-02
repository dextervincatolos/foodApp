let wishlistModel = require('../model/wishlistModel');
let userModel = require('../model/userModel');

let addWishlist = async (req, res) => {

    try {
        const productId = req.body._items;
        const userId = req.body._user;

        let wishlist = await wishlistModel.findOne({ _user: userId });

        if (!wishlist) {
            
           let newwishlist = new wishlistModel({
                _user: userId,
                _items: [productId]
                
            });
            await newwishlist.save();
        } else {

            wishlist._items.push(productId);
            await wishlist.save();
        }

        res.send("Item added to wishlist successfully");
    } catch (err) {
        res.status(500).send(err);
    }
};

let findwishlist = (req,res)=>{

    const userId = req.query.uid

       wishlistModel.findOne({ _user: userId }).then(data=>{

            if(!data){
                res.status(404).send({message: "Doesn't exist!"})
            }else{
                res.send(data)
            }
        }).catch(err=>{
            res.status(500).send({message:"Internal Server Error"})
         })
    
}

module.exports = {addWishlist,findwishlist};