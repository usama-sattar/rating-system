const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {registerValidation,loginValidation} = require('../validation')
const Admin = require("../models/AdminModel");

router.post('/register', async (req,res)=>{
    //validate schema
    const {error} = registerValidation(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }
    //validation check
    const emailCheck = await Admin.findOne({email: req.body.email})
    if(emailCheck){
        res.status(400).send("email already registered")
    }
    //password hash
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    //saving user
    const user = new Admin({
        email: req.body.email,
        password: hashPassword
    })
    try{
        const newUser = user.save()
        res.send(newUser)
    }
    catch(err){
        res.status(400).send(err)
    }
})

router.post('/login', async (req,res)=>{
    //validate schema
    const {error} = loginValidation(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }
    //validation check
    const userCheck = await Admin.findOne({email: req.body.email})
    if(!userCheck){
        res.status(400).send("email or password is wrong")
    }    
    const passCheck = await bcrypt.compare(req.body.password, userCheck.password)
    if(!passCheck){
        res.status(400).send("password is wrong")
    }
    const token = jwt.sign({_id: userCheck._id}, process.env.SECRET_KEY)
    res.header("auth-token", token).send(token)  
})

router.get('/', async (req,res)=>{
    const all = Admin.find()
    try{
        res.json(all)
    }
    catch(err){
        res.status(400).send(err)
    }  
})

router.post('/delete/user', (req,res)=>{
    User.findByIdAndDelete(req.body._id)
    .then((result)=> res.send("user deleted"))
    .catch ((err)=>res.status(400).send(err))
})

router.post('/delete/owner', (req,res)=>{
    User.findByIdAndDelete(req.body._id)
    .then((result)=> res.send("owner deleted"))
    .catch ((err)=>res.status(400).send(err))
})

router.post('/delete/rating', (req,res)=>{
    User.findByIdAndDelete(req.body._id)
    .then((result)=> res.send("rating deleted"))
    .catch ((err)=>res.status(400).send(err))
})

module.exports = router