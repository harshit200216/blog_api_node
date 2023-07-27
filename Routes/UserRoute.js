const express = require("express");

const router = express.Router();
const userController = require('../Controller/UserController');

//Create user
router.post('/',userController.createUser);

//get specific user
router.get('/:userId',userController.getUser);

//get all user
router.get('/',userController.getAllUsers);

//update user
router.put('/:userId',userController.updateUser);

//delete user
router.delete('/:userId',userController.deleteUser);

module.exports = router;

