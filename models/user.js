const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const UserSchema = mongoose.Schema;

const userSchema = new UserSchema({

    name:{
        type:String,
        min:[4,'minimum is 4 characters'],
    },
    email:{
        type:String,
        unique:true,
        required:"Email is required",
        match:[/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
    },
    username:{
        type:String,
        min:[4,"minimum is 4 characters"]
    },
    password:{
        type:String,
        min:[6,'minimum is 6 characters'],
        required:'password is required'

    }
});

userSchema.methods.hasSamePassword = function(requestedPassword) {

    return bcrypt.compareSync(requestedPassword, this.password);
  }
  
  
  userSchema.pre('save', function(next) {
    const user = this;
  
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
          user.password = hash;
          next();
      });
    });
  });
  

module.exports=mongoose.model('User',userSchema);