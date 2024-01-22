let mongoose = require('mongoose');
const FoodCategory = require('../model/productCategoryModel');

const foodCategories = [
  { _id:'6577bd91b957737a5088a9d3', _category: 'Bread',_desc: ''},
  { _id:'6577bd91b957737a5088a9d4',_category: 'Drink',_desc: '' },
  { _id:'6577bd91b957737a5088a9d5',_category: 'Pizza',_desc: ''}
];

async function seedFoodCategories() {
  try {

    for (const category of foodCategories) {

      let existingCategory = await FoodCategory.findById(category._id);

      if (!existingCategory) {
        
        let createdCategory = await FoodCategory.create(category);

        console.log('Food categories seeded:', createdCategory);
        
      }else{
        console.log(`Food category '${category._category}' already exists, skipping seeding.`);
      }
    }
    
  } catch (err) {
    console.error('Error seeding food categories:', err);
  } finally {
    console.error('Food category Seeder executed Successfully.');
  }
}

seedFoodCategories()
  .catch(err => {
    console.error('Error during seeding:', err);
  });

module.exports = {seedFoodCategories };