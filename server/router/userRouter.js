

let express = require('express');
let router = express.Router();

let userController = require('../controller/userController');

router.post('/newUser',userController.registerUser);
router.get('/findUser',userController.findUser);
// router.put('/updateUser/:id',userController.updateProduct);
// router.delete('/deleteuser/:id',userController.deleteProduct);

module.exports = router;


