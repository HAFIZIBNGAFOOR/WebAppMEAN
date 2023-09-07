const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

//var User = require("../models/user.model");

passport.use(
  new LocalStrategy({ usernameField: 'email' },
  async (username,password,done)=>{
    const user = await User.findOne({email:username})
                          if (!user)
                          return done(null, false, { message: 'Email not registered' });
                          else if (!user.verifyPassword(password))
                              return done(null, false, { message: 'Wrong password.' });
                          else
                              return done(null, user);     
  }
))
