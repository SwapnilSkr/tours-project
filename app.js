const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes'); //fetching the tourRoutes package that we created.
const userRouter = require('./routes/userRoutes'); //fetching the userRoutes package that we created.
const app = express();

//1) MIDDLEWARE
if (process.env.NODE_ENV == 'development') {
  //Making sure that the logger works only when the app is in development environment.
  app.use(morgan('dev')); // HTTP request logger middleware.
}

app.use(
  express.json()
); /* This express.json() is a middleware(body parser). Middleware is basically just a function that can modify the incoming
request data...this is called middleware because it stands between the request and the response. It is just a step the request goes
through while it is being processed. And the steps the requests go through in this example is simply that the data from the body is
added to it. So it is added to the request object through this middleware.*/

app.use(
  express.static('./public')
); /*this middleware is used to serve the static files. These files are the ones to which we 
haven't defined any routers yet, like those in the public folder, the html files, the css files etc. Remember that on the browser
always use 127.0.0.1:3000/filename.ext, no need to specify the folder name before the filename because it has already been 
defined inside the middleware. */

app.use((req, res, next) => {
  /*So this is a middleware created by us where we have the req and res objects along with a next() 
function which is necessary for completing the middleware. In middlewares order is really important. We cannot use this middleware
after the app after any router middleware because this is a global middleware while on the other hand the router middlewares are\
route specific middlewares. */
  console.log('Hello from the middleware....');
  next();
});

app.use((req, res, next) => {
  req.requestTime =
    new Date().toISOString(); /*requestTime property is set to display the current time and date. toISOString() 
  converts the date to a string representable manner.*/
  next();
});

//2) ROUTES

/*app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTourbyId);
app.post('/api/v1/tours', CreateTour);               Refactoring the routes 
app.patch('/api/v1/tours/:id', UpdateTour);
app.delete('/api/v1/tours/:id', DeleteTour);*/

app.use('/api/v1/tours', tourRouter); //Mounting the routers
app.use('/api/v1/users', userRouter); //We have to use the router middleware at the end.

/*We have two http methods to update data. Those methods are put and patch. And with put we expect that our application receives 
the entire new updated object, and with patch, we only expect the properties that should actually be updated on the object. We 
generally use patch  because it is easier to simply update the properties that we want to update instead of returning the entire
object. So we are going to make our app work for patch and not put.*/

module.exports = app;
