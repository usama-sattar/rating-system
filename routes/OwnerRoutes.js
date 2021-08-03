const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
const Owner = require("../models/OwnerModel");
const Restaurant = require("../models/RestaurantModel");

router.post("/register", async (req, res) => {
  //validate schema
  // const {error} = registerValidation(req.body)
  // if(error){
  //     res.status(400).send(error.details[0].message)
  // }
  // //validation check
  const emailCheck = await Owner.findOne({ email: req.body.email });
  if (emailCheck) {
    res.status(400).send("email already registered");
  } else {
    //password hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //saving user
    const user = new Owner({
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
  const userCheck = await Owner.findOne({ email: req.body.email });
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

router.get("/", async (req, res) => {
  const all = Owner.find();
  try {
    res.json(all);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.get("/restaurants/:id", (req,res)=>{
  Restaurant.find({"owner": req.params.id})
  .then((items) =>  res.send(items) )
  .catch((err) => res.status(400).json("Error" + err));
})

router.post("/add/restaurant", async (req, res) => {
  const restaurant = new Restaurant({
    owner: req.body.own,
    name: req.body.name,
    address: req.body.address,
  });
  try {
    const newRest = await restaurant.save();
    res.send(newRest);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
