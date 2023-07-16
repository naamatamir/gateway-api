const express = require('express');
const login = require('../DAL/loginAPI');

const loginRouter = express.Router();

//Entry Point 'http://localhost:8002/authUsers/login'

loginRouter.route('/').post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await login({ username, password });
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = loginRouter;
