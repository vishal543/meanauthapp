var express = require('express');
var router = express.Router();
const User = require('../controllers/user');

router.post('/register',User.register);

router.post('/authenticate',User.authenticate);

router.get('/profile',User.profile,(req,res)=>{
    res.json({"secret":true});

});

module.exports=router;
