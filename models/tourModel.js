/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  //Creating a basic tour schema illustrating the type of tour we want to create
  name: {
    type: String,
    required: [true, 'A tour must have a name'], //This property ensures that name is required.
    unique: true, //This property ensures that the name must be unique.
  },
  rating: {
    type: Number,
    default: 4.5, //This property ensures that the rating has 4.5 in default.
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema); //Creating a model with the name 'Tour' and specifying the schema.

module.exports = Tour; //exporting the Tour model to tourController.js
