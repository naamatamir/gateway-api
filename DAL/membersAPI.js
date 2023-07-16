const axios = require('axios');

const membersURL = 'http://localhost:8000/members';

const getAllMembers = async () => {
  try {
    const response = await axios.get(membersURL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch members data', error);
    throw error;
  }
};

const getMemberById = async (id) => {
  try {
    const response = await axios.get(`${membersURL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch member with ID ${id}', error);
    throw error;
  }
};

const addMember = async (obj) => {
  try {
    const response = await axios.post(membersURL, obj);
    return response.data;
  } catch (error) {
    console.error('Failed to create member', error);
    throw error;
  }
};

const updateMember = async (id, obj) => {
  try {
    const response = await axios.put(`${membersURL}/${id}`, obj);
    return response.data;
  } catch (error) {
    console.error('Failed to update member', error);
    throw error;
  }
};

const deleteMember = async (id) => {
  try {
    const response = await axios.delete(`${membersURL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete member', error);
    throw error;
  }
};

module.exports = {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
};
