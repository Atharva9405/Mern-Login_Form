const express = require("express");
const app = express();
const loginRoutes = require("./routes/api/login");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

//const db_uri = "mongodb://localhost:27017/test"

const PORT = process.env.EXPRESS_PORT || 5000;
app.use(cors());

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

//mongoose promise is deprecated so we override it with node's promise
mongoose.Promise = global.Promise;
//Connect to MongoDB database

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type,Accept,Authorzation"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

app.use("/api/user", loginRoutes);
app.use((req, res, next) => {
  res.send("Welcome to Express");
});

app.use("/api", (req, res, next) => {
  next();
});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
