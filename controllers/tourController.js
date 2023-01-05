/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-object-spread */
/* eslint-disable prettier/prettier */
const fs = require('fs');
const Tour = require('./../models/tourModel');

/*const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`) //tours stores the array of objects from tours-simple...
);*/

/*exports.checkId = (req, res, next, val) => {
  console.log(`The Tour id is ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};*/

/*exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};*/

exports.getAllTours = async (req, res) => {
  /* instead of const we are using exports.function-name because we will be exporting these
functions to the tourRoutes.js package.
  console.log(req.requestTime);
   res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });*/
  try {
    //1.Filtering :
    /*const tours = await Tour.find({  We can hard code a query like this as well
      duration: 5,
      difficulty: 'easy',
    });*/

    /*const tours = await Tour.find() We can also define queries using the below methods
      .where('duration')
      .equals(5)
      .where('difficulty')
      .equals('easy');*/

    /*Now there are some special field names present by default in the query string which are used for special purposes like 
    pagination etc. For now we have to exclude those special field names from our query string. */
    const queryObj = { ...req.query }; //Creating a copy of the req.query object so that we don't tamper with the main object.
    const excludedFields = ['page', 'sort', 'limit', 'fields']; //The special fields to be excluded
    excludedFields.forEach((ele) => {
      //This loops through the entire excludedFields array and executes the defined function.
      delete queryObj[ele];
    });

    //console.log(req.query, queryObj); This req.query is an object containing the queries which we made in the url (postman)

    //2. Advanced Filtering :
    let queryStr = JSON.stringify(queryObj); //converting into string so we can use the replace method as it is only for strings.
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    ); /*\b...\b is used to make sure that the exact words
    are getting replaced and not just the letters. The /g is used because if not used then only the first operator i.e, gte 
    would have been replaced. */
    console.log(JSON.parse(queryStr));

    /*console.log(
      queryObj
    ); returns { duration: { gte: '5' }, difficulty: 'easy' } in the console and error as a response
    when passed GET /api/v1/tours?duration[gte]=5&difficulty=easy as a query*/

    //3. Sorting :
    //const query = Tour.find(queryObj); the server will filter according to the passed query and then return it.
    let query = Tour.find(JSON.parse(queryStr)); //We want the server to respond to [gte] and not just [$gte] so we pass this instead.

    if (req.query.sort) {
      //remember that req.query is an object and req.query.sort is a string.
      const sortBy = req.query.sort.split(',').join(' '); //handling when we have to sort more than one fields.
      //query = query.sort(req.query.sort);
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    const tours = await query; //We will await the query at last when all of our filtering work has been done.

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTourbyId = async (req, res) => {
  //? makes the parameter optional.
  /*This :var is used to specify the variable
  console.log(
    req.params
  ); req.params is where the variables defined in the routes are stored. It is an object which automatically 
    assigns the value to our variable that we defined in the route.*/
  /*const id = req.params.id * 1;
  const tour = tours.find(
    (ele) => ele.id === id
  );  This find method is used to iterate through the tours array until it finds the
    object with an id equal to the variable passed as the parameter in the route.*/
  /* if (!tour) {
      return res.status(404).json({         Another way to handle error responses.
        status: 'fail',
        message: 'Invalid ID',
      });
    }*/
  /*res.status(200).json({
    status: 'success',
    //result: tours.length,
    data: {
      tour,
    },
  });*/
  try {
    const tour = await Tour.findById(req.params.id);
    //same as Tour.findOne({_id: req.params.id}); _id because that is how it is defined by mongodb.
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.CreateTour = async (req, res) => {
  /* console.log(
      req.body
    ); body is the property that is gonna be available on the request because we used the middleware on line 4. */
  /*res.send(
      'Done'
    ); We always need to send back something in order to finish the request/response cycle*/
  /*const newId =
    tours[tours.length - 1].id +
    1; This is used to increment the id of the new tour by adding 1 to the last tour's id

  const newTour = Object.assign(
    { id: newId },
    req.body
  ); Object.assign allows us to create a new object by merging two existing 
    objects together. Here the first object is the newId and the second one is the body that we created in postman. 

  tours.push(
    newTour
  ); Pushing the newTour object into the tours array of objects. 

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    }
  );
  const newTour = new Tour({});   We normally create a new tour using this method
  newTour.save();  But we can also use another method*/
  try {
    const newTour = await Tour.create(
      req.body
    ); /*We are using async await because .create or .save returns a promise which can be
    handled by either .then and catch or try and catch*/
    res.status(201).json({
      status: 'success',
      data: {
        tours: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.UpdateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //so that the patch request returns the updated document and not the original one
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.DeleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).send('Tour deleted');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};
