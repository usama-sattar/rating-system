const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
const User = require("../models/UserModel");
const Rating = require("../models/RatingModel");
const Restaurant = require("../models/RestaurantModel")

router.post("/register", async (req, res) => {
  console.log("server register called");
  //validate schema
  // const {error} = registerValidation(req.body)
  // if(error){
  //     res.status(400).send(error.details[0].message)
  // }
  //validation check
  const emailCheck = await User.findOne({ email: req.body.email });
  if (emailCheck) {
    res.status(400).send("email already registered");
  } else {
    //password hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //saving user
    const user = new User({
      email: req.body.email,
      password: hashPassword,
    });
    try {
      const newUser = await user.save();
      res.send(newUser);
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

router.post("/login", async (req, res) => {
  //validate schema
  // const {error} = loginValidation(req.body)
  // if(error){
  //     res.status(400).send(error.details[0].message)
  // }
  //validation check
  const userCheck = await User.findOne({ email: req.body.email });
  if (!userCheck) {
    res.status(400).send("email or password is wrong");
  } else {
    const passCheck = await bcrypt.compare(
      req.body.password,
      userCheck.password
    );
    if (!passCheck) {
      res.status(400).send("password is wrong");
    } else {
      const token = jwt.sign({ _id: userCheck._id }, process.env.SECRET_KEY);
      res.header("auth-token", token).send({token,userCheck});
    }
  }
});

router.get("/restaurants", async (req, res) => {
  console.log("all called")
  Restaurant.find()
  .then((items) =>  res.send(items) )
  .catch((err) => res.status(400).json("Error" + err));
});

router.get("/", async (req, res) => {
  const all = User.find();
  try {
    res.json(all);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/rating/:id", async (req, res) => {
  const result = await Restaurant.findById(req.params.id)
  try {
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});



router.post("/rate", async (req, res) => {
  const rate = new Rating({
    user: req.body.user,
    restaurant: req.body.restaurant,
    ratingNumber: req.body.ratingNumber,
    comment: req.body.comments,
    date: new Date(),
  });
  try {
    const newRating = await rate.save();
    console.log(newRating);
    Restaurant.findOne(
      { _id: req.body.restaurant },
      { $inc: { 'ratingCount' : 1, 'ratingSum': req.body.ratingNumber }},
      {new: true},
    );
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
