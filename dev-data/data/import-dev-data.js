/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
const fs = require('fs');
const Tour = require('./../../models/tourModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
  path: './config.env',
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log('DB connection successful');
  });

/*console.log(process.argv); run node filename and see that there is an array in the commandline.*/

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully imported!');
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany(); //deletes all the objects.
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  //this will import data when typed  node dev-data/data/import-dev-data.js --import on terminal.
  importData();
} else if (process.argv[2] === '--delete') {
  //this will delete all data when typed  node dev-data/data/import-dev-data.js --delete on terminal.
  deleteData();
}
