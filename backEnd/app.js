const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const recordsRoutes = require("./routes/records")
const postsUsers = require("./routes/users")
const app = express();

const urlMongoDb = 'mongodb://localhost:27017/SCADb'

mongoose
  .connect(urlMongoDb)
  .then(() => {
    console.log("Connection successful")
  })
  .catch(() => {
    console.log("Connection fail!")
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD")
  next();
})

app.use("/api/records", recordsRoutes)
app.use("/api/users", postsUsers)

module.exports = app;
