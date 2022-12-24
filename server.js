const dotenv = require('dotenv');
dotenv.config({
  path: './config.env',
}); /*Installing dotenv package and linking config.env with server.js through this command.
Remember that this should remain before we require or import app from app.js to server.js which is done in the next step.
Changed the json scripts in package.json for development and production environments.*/
const app = require('./app');

/*console.log(
  app.get('env')
); We are currently in a development environment. So this app.get('env') will get us the'env' environment
variable. So environment variables are global variables that are used to define the environment in which the node app is running.
This 'env' variable is set up by Express itself but node.js also sets up a lot of environment variables.*/
console.log(process.env); //list of environment variables
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening to requests on port ${port}`);
}); //go to package.json and change the script to nodemon server.js because we will start the server through this file only
//then in the terminal run npm start.
