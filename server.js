/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
  path: './config.env',
}); /*Installing dotenv package and linking config.env with server.js through this command.
Remember that this should remain before we require or import app from app.js to server.js which is done in the next step.
Changed the json scripts in package.json for development and production environments.*/
const app = require('./app');
const DB = process.env.DATABASE.replace(
  /*storing the database from the config.env but replacing the <PASSWORD> with 
DATABASE_PASSWORD*/
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    //this object is used to deal with deprecations.
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    //.connect returns a promise so it needs to be dealt with using then
    //console.log(con.connections);
    console.log('DB connection successful');
  });

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

/*console.log(
  app.get('env')
); We are currently in a development environment. So this app.get('env') will get us the'env' environment
variable. So environment variables are global variables that are used to define the environment in which the node app is running.
This 'env' variable is set up by Express itself but node.js also sets up a lot of environment variables.*/
//console.log(process.env); list of environment variables
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening to requests on port ${port}`);
}); //go to package.json and change the script to nodemon server.js because we will start the server through this file only
//then in the terminal run npm start.
