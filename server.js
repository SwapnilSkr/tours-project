const app = require('./app');
const port = 3000;
app.listen(port, () => {
  console.log(`App listening to requests on port ${port}`);
}); //go to package.json and change the script to nodemon server.js because we will start the server through this file only
//then in the terminal run npm start.
