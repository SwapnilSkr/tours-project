const express = require('express');

const getAllUsers = (req, res) => {
  res.status(500).json({
    //500 is called internal error.
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const PostUser = (req, res) => {
  res.status(500).json({
    //500 is called internal error.
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const getUserbyId = (req, res) => {
  res.status(500).json({
    //500 is called internal error.
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const UpdateUser = (req, res) => {
  res.status(500).json({
    //500 is called internal error.
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const DeleteUser = (req, res) => {
  res.status(500).json({
    //500 is called internal error.
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const Router = express.Router();

Router.route('/').get(getAllUsers).post(PostUser);
Router.route('/:id').get(getUserbyId).patch(UpdateUser).delete(DeleteUser);

module.exports = Router;
