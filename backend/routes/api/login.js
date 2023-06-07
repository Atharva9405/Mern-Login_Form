const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response, application } = require("express");
const { json } = require("body-parser");
const Joi = require("joi");

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

router.put("/update", async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  const bearerToken = req.headers.authorization;
  console.log(bearerToken);
  let token = null;
  if (bearerToken) {
    token = bearerToken.split(" ")[1];

    const payload = jwt.verify(token, "1234");
    console.log(req.body);

    const schema = Joi.object({
      firstName: Joi.string(),
      middleName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string(),
      address: Joi.string(),
      mobileNo: Joi.string(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      return next(new Error(result.error.details[0].message));
    } else {
      console.log("hi");
      const user = await User.findOneAndUpdate(
        { _id: payload.userID },
        {
          $set: result.value,
        },
        {
          new: true,
        }
      );
      console.log(user);
      res.send(user);
    }
  } else {
    res.status(401);
    const err = new Error("please login to update");
    return next(err);
  }
});

router.post("/login", async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");

  var body = req.body;
  let user = await User.findOne({ username: body.username });
  if (!user) {
    return res.status(401).send({ status: false });
  } else {
    User.findOne({ username: body.username }, async (err, u) => {
      await bcrypt.compare(body.password, u.password, function (err, result) {
        console.log(u.password);
        console.log(body.password);

        if (err) {
          console.log("failed");
          res.status(401).send({ status: false });
        }

        if (result) {
          res.status(200).send({ status: true });
          console.log("password matched");
        } else {
          console.log("failed");
          res.status(401).send({ status: false });
        }
      });
    });
  }
});

/*if (err) {
  console.log("failed")
   res.status(401).send(err);
   } else { 
       /*const payload={
         userID:u._id,
         name:u.username,
         email:u.email

       }
      const token= jwt.sign(payload,'1234')
      console.log(token)
     return res.send ({message:"login succcessful",token});
   }*/

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
