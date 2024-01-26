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

//for counting and display to bade on UI
let findbasket = (req,res)=>{

    const userId = req.query.uid

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

let getMyCart = async (req, res) => {
    try {
        const userId = req.query.uid; // Assuming user ID is available in req.user after authentication

        let basket = await basketModel.findOne({ _user: userId }).populate('_items');

        if (!basket) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        res.status(200).json({ items: basket._items });
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = { addtobasket,findbasket,getMyCart };


