
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
//const passport = require('passport');
const bcrypt = require("bcryptjs");


const Admin = mongoose.model('Admin');
const User = mongoose.model('User');
const _ = require('lodash');
// Inside the try block of the main function

// const saveAdmin = async (req,res)=>{
//   try {
//     console.log(User);
//     const adminEmail = req.body.email; // Replace with a dummy email
//     const adminPassword = req.body.password;; // Replace with a dummy password

//     // Hash the admin password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

//     // Define the admin user document
//     console.log(adminEmail,adminPassword,hashedPassword);
//     // const adminUser = {
//     //   email: adminEmail,
//     //   password: hashedPassword,

//     // };
//     // const result = await Admin.insertOne(adminUser);
//     const admin = new Admin()
//     admin.email = adminEmail,
//     admin.password = hashedPassword
//     const result = await admin.save()
//     console.log('Admin user created:', result);
//   } catch (error) {
//     console.log(error ,' this is error inside the save admin');
//   }
// }


const adminLogin = async(req,res)=>{
  try{
    const {email,password} = req.body;
    const adminDetails = await Admin.findOne({email});
    if(adminDetails){
      const comparePassword = await bcrypt.compare(password,adminDetails.password)
      if(comparePassword){
        const token = jwt.sign({adminId:adminDetails._id},"SECRETISTHISSTRING",  {expiresIn: process.env.JWT_EXP});
        return res.status(200).json({"token":token});
      }else{
        return res.status(401).json({message:"Entered password is incorrect "});
      }
    }else{
      return res.status(401).json({message:"Is Not an Admin!"});
    }
  }
  catch(error){
    res.status(500).json({error});
  }
}
const adminProfile = async(req,res,next)=>{
try{
const admin = await Admin.findOne({_id: req._id })
if (!admin) {
  return res.status(404).json({ status: false, message: 'Not found' });
} else {
  return res.status(200).json({
    status: true,
    user: _.pick(admin, ['email']),
    
  })  
}
}
catch(err){
  return next(err);
}
}

const userList = async(req,res)=>{
  try{
    const users = await User.find();
    if(users) {
      const pickedData = _.map(users, user =>
        _.pick(user, ['_id', 'fullName', 'email', 'profilePic','isblock'])
      );
      return res.status(200).json(pickedData);
    }
    else return res.status(404).json({ status: false, message: 'Not found' });
  }
  catch(error){
    res.status(500).json({error:error });
  }
}
const addUser = async(req,res,next)=>{
  try{
    console.log(req.body.name, req.body.email, req.body.password);
    const user = new User();
    user.fullName = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    const savedUser = await user.save();
    res.send(savedUser);
  }
  catch(err){
    if (err.code === 11000) {
      res.status(422).send(['Entered Email already exists.']);
    } else {
      next(err);
    }
  }
}

const editUser = async(req,res)=>{
  try{

    const {id}= req.params;
   const updated = await User.findByIdAndUpdate(
    {_id:id},
    {$set:{fullName:req.body.fullName,email:req.body.email}}
   );
   const userDetails = await User.find();
   const pickedData = _.map(userDetails,(user)=>
      _.pick(user,['_id', 'fullName', 'email', 'profilePic','isblock'])
   )
   return res.status(200).json(pickedData);

  }
  catch(error){
    res.status(500).json({error:error.message})
  }
}
const deleteUser = async(req,res)=>{
  try{
     const {id}= req.params;
   await User.deleteOne({ _id : id});
   res.status(200).json({message:"user deleted"});
    }
  catch(err){
    res.status(500).json({err:err.message})

  }
}

const blockUnblock = async(req,res)=>{
  try{
    const {id} = req.params;
    const user = await User.findById(id);
    if(user.isblock){
      user.isblock = false;
    }else{
      user.isblock = true;
    }
     await user.save();
    const users = await User.find(); 
    const pickedData = _.map(users,users=>
      _.pick(users, ['_id', 'fullName', 'email', 'profilePic','isblock'])
    )  
    return res.status(200).json(pickedData);
 }
  catch(error){
    res.status(500).json({error:error.message})
  }
}


module.exports = {
  adminLogin,
  adminProfile,
  userList,
  addUser,
  deleteUser,
  blockUnblock,
  editUser,
}