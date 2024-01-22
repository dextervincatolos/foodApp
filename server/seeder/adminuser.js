let mongoose = require('mongoose');
const userModel = require('../model/userModel');
let bcryptjs = require('bcryptjs');

async function seedAdminUser() {
  try {

    const existingAdmin = await userModel.findOne({ _email: 'support@snackpoint.com.ph' });
    
    if (!existingAdmin) {

        let salt = await bcryptjs.genSalt(10);
        let encryptedpass = await bcryptjs.hash('snackpoint123',salt);


        let adminDetails = { 
            _first_name:'System Administrator', 
            _last_name: '',
            _email: 'support@snackpoint.com.ph',
            _password: encryptedpass,
            _accesstype: 'admin'
        };

        let createAdmin = await userModel.create(adminDetails);
        console.log('Administrator seeded Successfully');
        
    }else{
        console.log('Administrator already exist, skipping seeding.');
    }

  } catch (err) {
    console.error('Error seeding administrator:', err);
  } finally {
    console.log('Administrator Seeder executed Successfully.');
  }
}

// Invoke the seeding function
seedAdminUser()
  .catch(err => {
    console.error('Error during seeding:', err);
    // mongoose.disconnect();
  });

module.exports = {seedAdminUser };