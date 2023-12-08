let basketModel = require('../model/basketModel');

let addtobasket = async (req, res) => {
    try {
        let item = req.body;
        let result = await basketModel.insertMany(item);
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {addtobasket};

// // Assuming you've already imported the necessary models and dependencies

// let addToBasket = async (req, res) => {
//     try {
//         const { productId } = req.body; // Assuming productId is sent in the request body

//         // Fetch the user's basket (you might use some identifier like userId)
//         const userId = 'user_id_here'; // Replace this with the actual user ID
//         let basket = await basketModel.findOne({ user: userId });

//         if (!basket) {
//             // If the basket doesn't exist, you might want to create one
//             basket = new basketModel({ user: userId, _items: [] });
//         }

//         // Add the productId to the basket
//         basket._items.push(productId);
//         await basket.save();

//         res.status(200).json({ message: 'Product added to basket successfully' });
//     } catch (err) {
//         res.status(500).send(err);
//     }
// };

// module.exports = { addToBasket };
