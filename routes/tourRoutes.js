/* eslint-disable prettier/prettier */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable prettier/prettier */
const express = require('express');
const tourController = require('./../controllers/tourController'); /*receiving the functions from tourController and storing it inside
tourController object. So tourController is an object of functions.*/
/*const {getAllTours,.....} = require('./../controllers/tourController'); would have been the same then we wouldn't have changed the
functions in the route handling section*/
const Router =
  express.Router(); /*In order to bundle the routers in a better manner, we are using separate routers for both 
resources*/

/*Router.param('id', (req, res, next, val) => {
  //this is called the param middleware where there are 4 arguments. val is new.
  console.log(`The Tour id is ${val}`);
  next();
});*/

//Router.param('id', tourController.checkId);

Router.route('/').get(tourController.getAllTours).post(
  /*tourController.checkBody,*/
  tourController.CreateTour
); /* ('/') is used in place of ('/api/v1/tours). We can use two 
  middleware functions by chaining them together inside a router request*/
Router.route('/:id')
  .get(tourController.getTourbyId)
  .patch(tourController.UpdateTour)
  .delete(tourController.DeleteTour);

module.exports = Router; //use this when you want to export only one object.
