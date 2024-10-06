const express = require('express');
const router = express.Router();
const User = require('../models/users'); // Adjust the path as necessary
const jwt = require('jsonwebtoken');

// Render Sign Up Form
router.get('/signup', (req, res) => {
  res.render('signup');
});

// logic for  Sign Up 
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User({ username, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Render Login Form
router.get('/login', (req, res) => {
  res.render('login');
});

//Logic for  Login 
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).send('User not found');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).send('Invalid credentials');
  }

  
  res.redirect('/');
});

module.exports = router;
