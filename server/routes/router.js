const express = require('express');
const router = express.Router();


const services =require('../services/render');
const productController = require('../controller/productController');

// // CRUD operations for food products
// // Create a new food product
// // router.post('/', async (req, res) => {
// //   try {
// //     const newFoodProduct = await FoodProduct.create(req.body);
// //     res.status(201).json(newFoodProduct);
// //   } catch (err) {
// //     res.status(400).json({ message: err.message });
// //   }
// // });

// // Get all food products
// router.get('/', async (req, res) => {
//   try {
//     const foodProducts = await FoodProduct.find();
//     res.json(foodProducts);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get a specific food product by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const foodProduct = await FoodProduct.findById(req.params.id);
//     if (foodProduct === null) {
//       return res.status(404).json({ message: 'Food product not found' });
//     }
//     res.json(foodProduct);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Update a food product by ID
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedFoodProduct = await FoodProduct.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (updatedFoodProduct === null) {
//       return res.status(404).json({ message: 'Food product not found' });
//     }
//     res.json(updatedFoodProduct);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete a food product by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedFoodProduct = await FoodProduct.findByIdAndDelete(req.params.id);
//     if (deletedFoodProduct === null) {
//       return res.status(404).json({ message: 'Food product not found' });
//     }
//     res.json({ message: 'Food product deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


//----------------------------------------------------------------

router.post('/',productController.new_product);
router.get('/',productController.find_product);
router.put('/:id',productController.update_product);
router.delete('/:id',productController.delete_product);

module.exports = router;
