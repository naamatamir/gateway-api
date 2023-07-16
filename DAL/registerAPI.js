const axios = require('axios');

const registerURL =`${process.env.USERS_BASE_URL}/authUsers/register`;
  // 'http://localhost:8001/authUsers/register';

const register = async ({ username, password, firstName, lastName }) => {
  try {
    const response = await axios.post(registerURL, { username, password , firstName, lastName});
    return response.data;
  } catch (error) {
    console.error('Failed to register', error);
    throw error;
  }
};

module.exports =  register ;