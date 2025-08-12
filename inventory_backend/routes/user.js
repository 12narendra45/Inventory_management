const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new User({ username, password: hashedPassword, role });
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User created', userId: savedUser._id ,success:true});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.post('/login', async (req, res) => {
  const { username, password,role } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
   if(user.role!==role){
    return res.status(400).json({ message: 'select correct role' });
   }
    res.json({ message: 'Login successful', userId: user._id, role: user.role, username: user.username,success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
