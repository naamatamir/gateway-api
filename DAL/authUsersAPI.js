const axios = require('axios');

const authUsersURL = 'http://localhost:8001/authUsers';

const getAllAuthUsers = async () => {
  try {
    const response = await axios.get(authUsersURL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch authUsers data', error);
    throw error;
  }
};

const getAuthUserById = async (id) => {
  try {
    const response = await axios.get(`${authUsersURL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch authUser with ID ${id}', error);
    throw error;
  }
};

const addAuthUser = async (obj) => {
  try {
    const response = await axios.post(authUsersURL, obj);
    return response.data;
  } catch (error) {
    console.error('Failed to create authUser', error);
    throw error;
  }
};

const updateAuthUser = async (id, obj) => {
  try {
    const response = await axios.patch(`${authUsersURL}/${id}`, obj);
    return response.data;
  } catch (error) {
    console.error('Failed to update authUser', error);
    throw error;
  }
};

const deleteAuthUser = async (id) => {
  try {
    const response = await axios.delete(`${authUsersURL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete authUser', error);
    throw error;
  }
};

module.exports = {
  getAllAuthUsers,
  getAuthUserById,
  addAuthUser,
  updateAuthUser,
  deleteAuthUser,
};
