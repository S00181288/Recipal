const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Recipe = require('./models/recipe');

const userRoutes = require('./Routes/user');
const recipesRoutes = require('./routes/recipes');

const app = express();

mongoose.connect("mongodb+srv://conor:vGuriPKiNgaPWmtd@cluster0-ubn5t.mongodb.net/RecipalDB?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected to MongoDB')
})
.catch(() => {
    console.log('Failed to connect to database');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Middleware to fix cors issue

app.use((req, res, next) => {
    res.setHeader(
      'Access-Control-Allow-Origin', '*'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
  });

 //password
  //vGuriPKiNgaPWmtd

  app.use( "/recipes" ,recipesRoutes);
  app.use("/user", userRoutes);

module.exports = app;

