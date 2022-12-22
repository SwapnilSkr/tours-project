const express = require('express');
const userController = require('./../controllers/userController');

const Router = express.Router();

Router.route('/').get(userController.getAllUsers).post(userController.PostUser);
Router.route('/:id')
  .get(userController.getUserbyId)
  .patch(userController.UpdateUser)
  .delete(userController.DeleteUser);

module.exports = Router;
