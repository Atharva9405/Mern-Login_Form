const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const bcrypt = require("bcryptjs");

router.get("/all", (req, res, next) => {
  //
  /*User.find({},'username')
        .then(data => res.json(data))
        .catch(err => res.send(err));*/
  User.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.post("/login", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");

  var body = req.body;

  User.findOne({ username: body.username }, function (err, u) {
    console.log(body.username);
    console.log(body.password);
    bcrypt.compare(body.password, u.password, function (err, result) {
      console.log(u.password);
      if (err) {
        console.log("failed");
        res.status(401).send(err);
      } else {
        res.status(200).send({ status: true });
        console.log("password matched");
      }
    });
  });
});

router.post("/register", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  var body = req.body;
  bcrypt.genSalt(10, function (err, salt) {
    console.log(salt);
    bcrypt.hash(body.password, salt, function (err, hash) {
      console.log(hash);
      var user = new User({
        username: body.userId,
        password: hash,

        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
        email: body.email,
        address: body.address,
        mobileNo: body.mobileNo,
      });

      user.save(function (err, user) {
        if (err) {
          console.error(err);
          res.status(500).send({ status: false, error: err });
        } else {
          console.log("User created successfully!!");
          res
            .status(201)
            .send({ status: true, msg: "User created successfully!" });
        }
      });
      // Store hash in your password DB.
    });
  });
});

module.exports = router;
