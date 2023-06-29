var express = require('express');
var router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_TOKEN;
const withAuth = require('../middlewares/auth');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error registering new user' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)

  try {
    let user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: 'Incorrect email or password' });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (!same)
          res.status(500).json({ error: 'Incorrect email or password' });
        else {
          const token = jwt.sign({ email }, secret, { expiresIn: '10d' });
          res.status(200).json({ user: user, token: token });
        }
      })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal error, please try again' });
  }
})

router.post('/password', withAuth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { _id } = req.user;
  

  try {
    let user = await User.findById(_id);
    user.isCorrectPassword(oldPassword, function (err, same) {
      if (!same){
        res.status(401).json({ error: 'Incorrect password' });}
      else {
        res.status(200).json({ newPassword: newPassword });
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal error, please try again' });
  }
})

router.put('/', withAuth, async (req, res) => {
  const { name, email } = req.body;
  try { 
    let user = await User.findByIdAndUpdate(
      req.user._id, 
      { $set: { name: name, email: email } }, 
      { upsert: true, 'new': true }
    )
    let token = updateToken(email);
    res.status(200).json({ user: user, token: token });
  } catch (error) {
    res.status(401).json({error: 'problema aqui'})
  }
})

router.put('/password', withAuth, async (req, res) => {
  const { password } = req.body;
  try { 
    let user = await User.findById(req.user._id);
    if (user.password == password) {
      res.status(401).json({error: 'The new password can`t be the same of the old password'})
    } else {
      user.password = password;
      user.save();
      res.status(200).json({ newPassword: password });
    }
  } catch (error) {
    res.status(401).json({error: error})
  }
})

router.delete('/', withAuth, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    await user.delete();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Problem to delete a user' });
  }
})

const updateToken = (email) => {
  const token = jwt.sign({ email }, secret, { expiresIn: '10d' });
  return token;
}

module.exports = router; 