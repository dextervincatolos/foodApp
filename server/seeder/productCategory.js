let mongoose = require('mongoose');
const FoodCategory = require('../model/productCategoryModel');

// Array of food categories to seed into the database
const foodCategories = [
  { _id:'6577bd91b957737a5088a9d3', _category: 'Bread',_desc: ''},
  { _id:'6577bd91b957737a5088a9d4',_category: 'Drink',_desc: '' },
  { _id:'6577bd91b957737a5088a9d5',_category: 'Pizza',_desc: ''}
];

async function seedFoodCategories() {
  try {

    await FoodCategory.deleteMany();

    // Insert the food categories
    const createdCategories = await FoodCategory.insertMany(foodCategories);
    console.log('Food categories seeded:', createdCategories);
  } catch (err) {
    console.error('Error seeding food categories:', err);
  } finally {
    // Close the database connection after seeding
    // mongoose.disconnect();
  }
}

// Invoke the seeding function
seedFoodCategories()
  .catch(err => {
    console.error('Error during seeding:', err);
    // mongoose.disconnect();
  });

module.exports = {seedFoodCategories };