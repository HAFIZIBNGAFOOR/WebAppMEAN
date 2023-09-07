require('./config/config');
require('./models/db');
require('./config/passportConfig');
const mongoose = require('mongoose');
//const User = mongoose.model('User');
const path=require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.route');
const adminRoute = require('./routes/admin_route');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api', rtsIndex);
app.use('/admin',adminRoute);
app.use(passport.initialize());

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    });
    
// Serve static files from the specified directory


// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));