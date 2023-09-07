const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const User = mongoose.model('User');

module.exports.register = async (req, res, next) => {
  try {
    const duplicateEntry = await User.findOne({email:req.body.email});
    if(!duplicateEntry){
      const user = new User();
      user.fullName = req.body.name;
      user.email = req.body.email;
      user.password = req.body.password;
      user.profilePic = req.body.image;
      const savedUser = await user.save(); 
      res.send({message:'success'});
    }else{
      res.status(422).send(['Duplicate email address found'])
    }
  } catch (error) {
      res.send({message:'Something went wrong try again'})
      next(error);
  }
};



module.exports.login = (req, res) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => { 
        // error from passport middleware
        if (err){
          return res.status(400).json(err);
        }
        // registered user
        else if (user) {
          return res.status(200).json({"token": user.generateJwt() });
        }
        // unknown user or wrong password
        else{
          return res.status(404).json(info);
        } 
    })(req, res);
}
module.exports.userProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req._id });

    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    } else {
      return res.status(200).json({
        status: true,
        user: _.pick(user, ['fullName', 'email','profilePic']),
        
      })  
    }
  } catch (err) {
    return next(err);
  }
};
