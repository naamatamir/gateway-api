const axios = require('axios');

const loginURL = `${process.env.USERS_BASE_URL}/authUsers/login`;
  // 'http://localhost:8001/authUsers/login';

const login = async ({ username, password }) => {
  try {
    const response = await axios.post(loginURL, { username, password });
    return response.data;
  } catch (error) {
    throw new Error('Failed to login ' + error.message);
  }
};

module.exports =  login ;
