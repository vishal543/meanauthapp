var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/database')
// var passport = require('passport');
// var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');

const usersRoutes = require('./routes/users');

mongoose.connect(config.DB_URI);

var app = express();

//middleware for body-parser
app.use(bodyParser.json());

//middleware for cors
app.use(cors());

//index route
app.get('/',(req,res)=>{
    res.send("Invalid End Point");
});
//routes
app.use('/users', usersRoutes);

const port = process.env.port || 3000;

app.listen(port,()=>{
    console.log("server running at port" +port);
});
