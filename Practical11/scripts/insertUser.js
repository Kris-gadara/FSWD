require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

mongoose.connect(process.env.MONGODB_URI);

async function createUser() {
    readline.question('Enter user name: ', async (name) => {
        readline.question('Enter user email: ', async (email) => {
            readline.question('Enter user age: ', async (age) => {
                const newUser = new User({
                    name,
                    email,
                    age: parseInt(age)
                });

                try {
                    const user = await newUser.save();
                    console.log('User created:', user);
                } catch (err) {
                    console.error('Error creating user:', err);
                } finally {
                    mongoose.connection.close();
                    readline.close();
                }
            });
        });
    });
}
createUser();