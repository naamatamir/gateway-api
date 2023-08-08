const express = require('express');
const register = require('../DAL/registerAPI');

const registerRouter = express.Router();

//Entry Point 'http://localhost:8002/authUsers/register'

registerRouter.route('/').post(async (req, res) => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
    } = req.body;

    const data = await register({
      username,
      password,
      firstName,
      lastName,
    });
    res.send(data);
  } catch (error) {
    console.error(
      `Error occurred during gateway registration: ${error.message}`
    );
    res.status(500).json({
      error: {
        message:
          'An error occurred during gateway registration. Please try again later.',
      },
    });
  }
});

module.exports = registerRouter;
