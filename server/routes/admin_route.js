const express = require('express');
const admin_router = express.Router();
const adminController = require('../controllers/admin.controller');
const jwtHelper = require('../config/jwtHelper');

admin_router.post('/login',adminController.adminLogin);

// admin_router.post('/add/login',adminController.saveAdmin);
admin_router.get('/adminProfile',jwtHelper.verifyAdminJwtToken,adminController.adminProfile);
admin_router.get('/userList',jwtHelper.verifyAdminJwtToken,adminController.userList);
admin_router.post('/addUser',adminController.addUser);
admin_router.post('/deleteUser/:id',adminController.deleteUser);
admin_router.post('/blockUnblock/:id',adminController.blockUnblock);
admin_router.put('/editUser/:id',adminController.editUser);


module.exports = admin_router;