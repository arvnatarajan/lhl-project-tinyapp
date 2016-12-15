'use strict'

require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080; // default port 8080
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;

const routes = require('./routes/routes.js') // get routes from file

app.use(bodyParser.urlencoded());                 // allows access to POST request parameters
app.use(methodOverride ('_method'));              // allows access to methodOverride in Express
app.set('view engine', 'ejs');                    // set the view engine to ejs
app.use(express.static(__dirname + '/assets'));   // load the assets folder

console.log(`Connecting to MongoDB running at: ${MONGODB_URI}`);

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.log('Could not connect to database! Unexpected error. Details below.');
    throw err;
  }

  console.log('Connected to database!');
  console.log('Retrieving documents for the "urls" collection...');

  let collection = db.collection('urls');

  app.use('', routes(collection)); // mount all routes
});

// listens for port
app.listen(PORT, () => {
  console.log(`TinyApp listening on PORT: ${PORT}!`);
});
