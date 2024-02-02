let basketModel = require('../model/basketModel');
let userModel = require('../model/userModel');

let addtobasket = async (req, res) => {

    try {
        const productId = req.body._items;
        const userId = req.body._user;

        let basket = await basketModel.findOne({ _user: userId });

        if (!basket) {
            
           let newbasket = new basketModel({
                _user: userId,
                _items: [productId]
            });

            await newbasket.save();

        } else {
        
            basket._items.push(productId);
            await basket.save();

        }

        res.status(200).json({ message: "Item added to basket successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
};


let findbasket = (req,res)=>{

    const userId = req.query.uid

    basketModel.find({ _user: userId }).then(data=>{

        if(!data){

            res.status(404).send({message:"User doesn't exist."})

        }else{

            res.send(data)

        }
    }).catch(err=>{

        res.status(500).send({message:"Error retrieving User"})

    })
}

let getMyCart = async (req, res) => {
    try {
        const userId = req.query.uid;

        let basket = await basketModel.findOne({ _user: userId }).populate('_items');

        if (!basket) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        res.status(200).json({ items: basket._items });
    } catch (err) {
        res.status(500).send(err);
    }
};

let removeItem = async (req, res) => {

    try {
        const productId = req.query.productId;
        const userId = req.query.userId;

        const basket = await basketModel.findOne({ _user: userId });
  
        if (!basket) {
            return res.status(404).json({ message: "Basket not found" });
        }
  
        const itemIndex = basket._items.indexOf(productId);
  
        if (itemIndex !== -1) {
            basket._items.splice(itemIndex, 1);
            await basket.save();
            res.status(200).json({ message: "Item removed successfully" });
        } else {
            res.status(404).json({ message: "Item not found in the basket" });
        }
    } catch (err) {
        res.status(500).send(err);
    }
  };

let addItem  = async (req, res) => {
    try {
        
        const productId = req.body._items;
        const userId = req.body._user;

        let basket = await basketModel.findOne({ _user: userId });

        if (!basket) {
            
           let newbasket = new basketModel({
                _user: userId,
                _items: [productId]
            });

            await newbasket.save();

        } else {
        
            basket._items.push(productId);
            await basket.save();

        }

        res.status(200).json({ message: "Item added to basket successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
};

const deleteMultipleItemFromCart = async (req, res) => {

    try {
        const productId = req.query.productId;
        const userId = req.query.userId;

        await basketModel.updateOne(
            { _user: userId },
            { $pull: { _items: productId } }
        );

        res.status(200).json({ message: "Item deleted from cart successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = { addtobasket,findbasket,getMyCart,deleteMultipleItemFromCart,removeItem,addItem };


