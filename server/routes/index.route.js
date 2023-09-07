const express = require('express');
const router = express.Router();
const app = express()
const userController = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path =require("path");
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
  cloud_name: "dcgrqxvbk",
  api_key: '241596312989648',
  api_secret: '5ktcJh7n9t-vBuk84YSzBnQg-vs'
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    resource_type: 'auto',
    allowed_formats: ['jpg', 'png'], 
    transformation: [{ width: 200, height: 200, crop: 'limit' }]
  },
});
// const storage = multer.diskStorage({
//   destination: './public/uploads/',
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   },
// });
const upload = multer({ storage: storage });
app.use(express.json()); 
// Serve static files
// router.use('/public/userImages', express.static(path.join(__dirname, '../public/userImages')));



router.post('/register',upload.single('image'),userController.register);
router.post('/authenticate',userController.login);
router.get('/usserprofile',jwtHelper.verifyJwtToken,userController.userProfile);

module.exports = router;