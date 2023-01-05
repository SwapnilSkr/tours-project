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
    trim: true, //This property ensures that there is no white spaces before and after the string.
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5, //This property ensures that the rating has 4.5 in default.
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    required: [true, 'A tour must have a summary'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String], //images will be an array of strings.
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date], //Different than the previous createdAt dates....this is an array of dates describing the timing of the tour.
});

const Tour = mongoose.model('Tour', tourSchema); //Creating a model with the name 'Tour' and specifying the schema.

module.exports = Tour; //exporting the Tour model to tourController.js
