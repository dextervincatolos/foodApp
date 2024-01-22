let express = require('express');
let router = express.Router();
let adminSeeder = require('../seeder/adminuser');

router.post('/adminUser',adminSeeder.seedAdminUser);

module.exports = router;


