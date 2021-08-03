const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config();
const cors = require("cors");
const jwt = require('jsonwebtoken');
const UserRoutes = require("./routes/UserRoutes")
const OwnerRoutes = require("./routes/OwnerRoutes")
const AdminRoutes = require("./routes/AdminRoutes")

const app = express()

app.use(
    cors({
      origin: "http://localhost:3000",
      credntials: true,
    })
  );
  
//app initialize
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
const connection = mongoose.connection
connection.once("open",()=>{
    console.log("database established");
})

app.use('/user', UserRoutes)
app.use('/owner', OwnerRoutes)
app.use('/admin', AdminRoutes)


//Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server starting at ${PORT}`));

module.exports = app;

