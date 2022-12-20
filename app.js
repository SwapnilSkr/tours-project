const fs = require('fs');
const express = require('express');
const app = express();
app.use(
  express.json()
); /* This express.json() is a middleware. Middleware is basically just a function that can modify the incoming
request data...this is called middleware because it stands between the request and the response. It is just a step the request goes
through while it is being processed. And the steps the requests go through in this example is simply that the data from the body is
added to it. So it is added to the request object through this middleware.*/

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`) //tours stores the array of objects from tours-simple...
);
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  //? makes the parameter optional.
  //This :var is used to specify the variable
  console.log(
    req.params
  ); /*req.params is where the variables defined in the routes are stored. It is an object which automatically 
  assigns the value to our variable that we defined in the route.*/

  const id = req.params.id * 1; // this is used to turn the id key in the params object from a string to an integer
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const tour = tours.find(
    (ele) => ele.id === id
  ); /* This find method is used to iterate through the tours array until it finds the
  object with an id equal to the variable passed as the parameter in the route.*/

  /* if (!tour) {
    return res.status(404).json({         Another way to handle error responses.
      status: 'fail',
      message: 'Invalid ID',
    });
  }*/

  res.status(200).json({
    status: 'success',
    //result: tours.length,
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  /* console.log(
    req.body
  ); body is the property that is gonna be available on the request because we used the middleware on line 4. */

  /*res.send(
    'Done'
  ); We always need to send back something in order to finish the request/response cycle*/

  const newId =
    tours[tours.length - 1].id +
    1; /* This is used to increment the id of the new tour by adding 1 to the last tour's id*/

  const newTour = Object.assign(
    { id: newId },
    req.body
  ); /*Object.assign allows us to create a new object by merging two existing 
  objects together. Here the first object is the newId and the second one is the body that we created in postman. */

  tours.push(
    newTour
  ); /*Pushing the newTour object into the tours array of objects. */

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App listening to requests on port ${port}`);
});
