require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect(process.env.MONGODB_URI);

User.find()
    .then(users => {
        console.log('All users:', users);
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error fetching users:', err);
        mongoose.connection.close();
    });